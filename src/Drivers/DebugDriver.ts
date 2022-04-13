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
import { groupConfigs } from 'src/Utils/groupConfigs'
import { DriverContract } from 'src/Contracts/DriverContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface DebugDriverOpts {
  namespace?: string
  formatter?: any
  formatterConfig?: any
}

export class DebugDriver implements DriverContract {
  public configs: Required<DebugDriverOpts>

  public constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = groupConfigs(configs, channelConfig)
  }

  transport(message: string, options: DebugDriverOpts = {}): void {
    const configs = groupConfigs<DebugDriverOpts>(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    debug(configs.namespace)(message)
  }
}
