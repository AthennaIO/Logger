/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Json } from '@secjs/utils'
import { FormatterFactory } from '#src/index'

export class Driver {
  /**
   * Holds the configuration object itself.
   *
   * @type {any}
   */
  configs = {}

  /**
   * Holds the configuration object of driver.
   *
   * @type {any}
   */
  driverConfig = {}

  /**
   * Holds the formatter string value.
   *
   * @type {string}
   */
  formatter = 'none'

  /**
   * Holds the configuration object of formatter.
   *
   * @type {any}
   */
  formatterConfig = {}

  /**
   * The max log level that this driver can transport.
   *
   * @return {string}
   */
  level = 'info'

  /**
   * The log level order to check if log could
   * be transported or not.
   *
   * @type {string[]}
   */
  levelOrder = ['trace', 'debug', 'info', 'success', 'warn', 'error', 'fatal']

  /**
   * Creates a new instance of ConsoleDriver.
   *
   * @param {any} configs
   * @return {ConsoleDriver}
   */
  constructor(configs) {
    this.configs = configs

    const json = Json.copy(configs)

    delete json.formatter
    delete json.formatterConfig

    this.driverConfig = json
    this.level = json.level || 'info'
    this.formatter = configs.formatter
    this.formatterConfig = configs.formatterConfig
  }

  /**
   * Transport the log.
   *
   * @param {string} level
   * @param {string} message
   * @return {any | Promise<any>}
   */
  transport(level, message) {}

  /**
   * Check if message could be transported.
   *
   * @param level {string}
   * @return {boolean}
   */
  couldBeTransported(level) {
    const levelIndex = this.levelOrder.indexOf(level)
    const maxLevelIndex = this.levelOrder.indexOf(this.level)

    return levelIndex >= maxLevelIndex
  }

  /**
   * Call formatter factory to format the message.
   *
   * @param level {string}
   * @param message {string}
   * @param [clean] {boolean}
   * @return {any}
   */
  format(level, message, clean = false) {
    const formatterConfig = { level, clean, ...this.formatterConfig }

    return FormatterFactory.fabricate(this.formatter)
      .config(formatterConfig)
      .format(message)
  }

  /**
   * Get the stream type for level.
   *
   * @param level {string}
   * @return {string}
   */
  getStreamTypeFor(level) {
    if (this.driverConfig.streamType) {
      return this.driverConfig.streamType
    }

    let streamType = 'stdout'

    if (level === 'error' || level === 'fatal') {
      streamType = 'stderr'
    }

    return streamType
  }
}
