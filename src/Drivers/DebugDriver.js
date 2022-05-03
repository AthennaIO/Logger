/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import debug from 'debug'

import { Config } from '@secjs/utils'

import { FactoryHelper, FormatterFactory } from '#src/index'

export class DebugDriver {
  /**
   * Holds the configuration set of DebugDriver.
   *
   * @type {{ namespace?: string, formatter?: any, formatterConfig?: any }}
   */
  configs

  /**
   * Creates a new instance of DebugDriver.
   *
   * @param {string} channel
   * @param {any} [configs]
   * @return {DebugDriver}
   */
  constructor(channel, configs = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = FactoryHelper.groupConfigs(configs, channelConfig)
  }

  /**
   * Transport the log.
   *
   * @param {string} message
   * @param {{ namespace?: string, formatter?: any, formatterConfig?: any }} [options]
   * @return {void}
   */
  transport(message, options = {}) {
    const configs = FactoryHelper.groupConfigs(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    debug(configs.namespace)(message)
  }
}
