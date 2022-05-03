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

import { ColorHelper, FactoryHelper, FormatterFactory } from '#src/index'

export class DiscordDriver {
  /**
   * Holds the configuration set of DiscordDriver.
   *
   * @type {{ url?: string, username?: string, formatter?: any, formatterConfig?: any }}
   */
  configs

  /**
   * Creates a new instance of DiscordDriver.
   *
   * @param {string} channel
   * @param {any} [configs]
   * @return {DiscordDriver}
   */
  constructor(channel, configs = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = FactoryHelper.groupConfigs(configs, channelConfig)
  }

  /**
   * Transport the log.
   *
   * @param {string} message
   * @param {{ url?: string, username?: string, formatter?: any, formatterConfig?: any }} [options]
   * @return {Promise<void>}
   */
  async transport(message, options = {}) {
    const configs = FactoryHelper.groupConfigs(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    await axios.post(configs.url, {
      username: configs.username,
      content: ColorHelper.removeColors(message),
    })
  }
}
