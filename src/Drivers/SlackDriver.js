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

export class SlackDriver {
  /**
   * Holds the configuration set of SlackDriver.
   *
   * @type {{ url?: string, formatter?: 'pino-pretty', formatterConfig?: import('pino-pretty').PrettyOptions }}
   */
  configs

  /**
   * Creates a new instance of SlackDriver.
   *
   * @param {string} channel
   * @param {any} [configs]
   * @return {SlackDriver}
   */
  constructor(channel, configs = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = FactoryHelper.groupConfigs(configs, channelConfig)
  }

  /**
   * Transport the log.
   *
   * @param {string} message
   * @param {{ url?: string, formatter?: 'pino-pretty', formatterConfig?: import('pino-pretty').PrettyOptions }} [options]
   * @return {Promise<void>}
   */
  async transport(message, options = {}) {
    const configs = FactoryHelper.groupConfigs(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    await axios.post(configs.url, { text: ColorHelper.removeColors(message) })
  }
}
