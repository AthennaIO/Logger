/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@secjs/utils'
import { Color } from 'src/Utils/Color'
import { DriverContract } from 'src/Contracts/DriverContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface ConsoleDriverOpts {
  color: Color
  level: string
  context: string
  formatter: string
  streamType: string
  formatterConfig: any
}

export class ConsoleDriver implements DriverContract {
  private readonly _formatter: string
  private readonly _streamType: string
  private readonly _formatterConfig: any

  constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this._formatter = configs.formatter || channelConfig.formatter
    this._streamType = configs.streamType || channelConfig.streamType
    this._formatterConfig = Object.assign(
      {},
      channelConfig.formatterConfig,
      configs.formatterConfig,
    )
  }

  transport(message: string, options?: ConsoleDriverOpts): void {
    options = Object.assign(
      {},
      {
        formatter: this._formatter,
        streamType: this._streamType,
      },
      options,
    ) as ConsoleDriverOpts

    const formatterOptions = Object.assign(
      {},
      this._formatterConfig,
      options.formatterConfig,
    )

    message = FormatterFactory.fabricate(options.formatter).format(
      message,
      formatterOptions,
    )

    process[options.streamType].write(`${message}\n`)
  }
}
