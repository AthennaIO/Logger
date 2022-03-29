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
  streamType: string
}

export class ConsoleDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _formatter: string
  private readonly _streamType: string

  constructor(channel: string) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this._level = channelConfig.level || 'INFO'
    this._context = channelConfig.context || 'ConsoleDriver'
    this._formatter = channelConfig.formatter || 'context'
    this._streamType = channelConfig.streamType || 'stdout'
  }

  transport(message: string, options?: ConsoleDriverOpts): void {
    options = Object.assign(
      {},
      {
        level: this._level,
        context: this._context,
        streamType: this._streamType,
      },
      options,
    )

    message = FormatterFactory.fabricate(this._formatter).format(
      message,
      options,
    )

    process[this._streamType].write(`${message}\n`)
  }
}
