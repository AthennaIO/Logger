/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@secjs/utils'
import { groupConfigs } from 'src/Utils/groupConfigs'
import { DriverContract } from 'src/Contracts/DriverContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface ConsoleDriverOpts {
  streamType?: 'stdout' | 'stderr'
  formatter?: any
  formatterConfig?: any
}

export class ConsoleDriver implements DriverContract {
  public configs: Required<ConsoleDriverOpts>

  public constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = groupConfigs(configs, channelConfig)
  }

  transport(message: string, options: ConsoleDriverOpts = {}): void {
    const configs = groupConfigs<ConsoleDriverOpts>(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    process[configs.streamType].write(`${message}\n`)
  }
}
