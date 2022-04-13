/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import axios from 'axios'
import { Config } from '@secjs/utils'
import { Color } from 'src/Utils/Color'
import { groupConfigs } from 'src/Utils/groupConfigs'
import { DriverContract } from 'src/Contracts/DriverContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface SlackDriverOpts {
  url?: string
  formatter?: any
  formatterConfig?: any
}

export class SlackDriver implements DriverContract {
  public configs: Required<SlackDriverOpts>

  public constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = groupConfigs(configs, channelConfig)
  }

  async transport(
    message: string,
    options: SlackDriverOpts = {},
  ): Promise<void> {
    const configs = groupConfigs<SlackDriverOpts>(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    await axios.post(configs.url, { text: Color.removeColors(message) })
  }
}
