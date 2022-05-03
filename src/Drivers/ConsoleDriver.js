/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@secjs/utils'

import { FactoryHelper } from '#src/Helpers/FactoryHelper'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

export class ConsoleDriver {
  /**
   * Holds the configuration set of ConsoleDriver.
   *
   * @type {{ streamType?: 'stdout' | 'stderr', formatter?: any, formatterConfig?: any }}
   */
  configs

  /**
   * Creates a new instance of ConsoleDriver.
   *
   * @param {string} channel
   * @param {any} [configs]
   * @return {ConsoleDriver}
   */
  constructor(channel, configs) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = FactoryHelper.groupConfigs(configs, channelConfig)
  }

  /**
   * Transport the log.
   *
   * @param {string} message
   * @param {{ streamType?: 'stdout' | 'stderr', formatter?: any, formatterConfig?: any }} [options]
   * @return {void}
   */
  transport(message, options = {}) {
    const configs = FactoryHelper.groupConfigs(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    process[configs.streamType].write(`${message}\n`)
  }
}
