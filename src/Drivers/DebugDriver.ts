/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { debug } from 'debug'
import { Config } from '@secjs/utils'
import { Color } from 'src/Utils/Color'
import { DriverContract } from 'src/Contracts/DriverContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface DebugDriverOpts {
  color: Color
  level: string
  context: string
  formatter: string
  namespace: string
}

export class DebugDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _formatter: string
  private readonly _namespace: string

  constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this._level = configs.level || channelConfig.level
    this._context = configs.context || channelConfig.context
    this._formatter = configs.formatter || channelConfig.formatter
    this._namespace = configs.namespace || channelConfig.namespace
  }

  transport(message: string, options?: DebugDriverOpts): void {
    options = Object.assign(
      {},
      {
        level: this._level,
        context: this._context,
        formatter: this._formatter,
        namespace: this._namespace,
      },
      options,
    )

    message = FormatterFactory.fabricate(options.formatter).format(
      message,
      options,
    )

    debug(options.namespace)(message)
  }
}
