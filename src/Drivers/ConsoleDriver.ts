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
}

export class ConsoleDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _formatter: string
  private readonly _streamType: string

  constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this._level = configs.level || channelConfig.level
    this._context = configs.context || channelConfig.context
    this._formatter = configs.formatter || channelConfig.formatter
    this._streamType = configs.streamType || channelConfig.streamType
  }

  transport(message: string, options?: ConsoleDriverOpts): void {
    options = Object.assign(
      {},
      {
        level: this._level,
        context: this._context,
        formatter: this._formatter,
        streamType: this._streamType,
      },
      options,
    )

    message = FormatterFactory.fabricate(options.formatter).format(
      message,
      options,
    )

    process[this._streamType].write(`${message}\n`)
  }
}
