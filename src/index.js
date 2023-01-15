/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ColorHelper } from '#src/index'
import { VanillaLogger } from '#src/Helpers/VanillaLogger'
import { DriverFactory } from '#src/Factories/DriverFactory'

export * from './Facades/Log.js'

export * from './Helpers/ColorHelper.js'
export * from './Helpers/VanillaLogger.js'
export * from './Helpers/FactoryHelper.js'

export * from './Drivers/Driver.js'
export * from './Formatters/Formatter.js'

export * from './Factories/DriverFactory.js'
export * from './Factories/FormatterFactory.js'

export class Logger {
  /**
   * The driver responsible for transporting the logs.
   *
   * @type {any[]}
   */
  #drivers = []

  /**
   * Runtime configurations to be used inside the Drivers and Formatters.
   *
   * @type {any}
   */
  #runtimeConfigs = {}

  /**
   * Creates a new instance of Logger.
   *
   * @return {Logger}
   */
  constructor() {
    if (!Config.exists(`logging.channels.${Config.get('logging.default')}`)) {
      return this
    }

    this.#drivers.push(DriverFactory.fabricate('default', this.#runtimeConfigs))
  }

  /**
   * Set runtime configurations for drivers and
   * formatters.
   *
   * @param {any} runtimeConfigs
   * @return {Logger}
   */
  config(runtimeConfigs) {
    this.#runtimeConfigs = runtimeConfigs

    return this
  }

  /**
   * Change the log channel.
   *
   * @param {string} channels
   * @return {Logger}
   */
  channel(...channels) {
    this.#drivers = []

    channels.forEach(c => {
      this.#drivers.push(DriverFactory.fabricate(c, this.#runtimeConfigs))
    })

    return this
  }

  /**
   * Call drivers to transport the log.
   *
   * @param {string} level
   * @param {string} args
   * @return {any | Promise<any>}
   */
  #log(level, ...args) {
    const message = ColorHelper.applyLogEngine(...args)

    const promises = this.#drivers.map(d => d.transport(level, message))

    return Promise.all(promises)
  }

  /**
   * Creates a log of type trace in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  trace(...args) {
    return this.#log('trace', ...args)
  }

  /**
   * Creates a log of type debug in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  debug(...args) {
    return this.#log('debug', ...args)
  }

  /**
   * Creates a log of type info in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  info(...args) {
    return this.#log('info', ...args)
  }

  /**
   * Creates a log of type success in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  success(...args) {
    return this.#log('success', ...args)
  }

  /**
   * Creates a log of type warn in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  warn(...args) {
    return this.#log('warn', ...args)
  }

  /**
   * Creates a log of type error in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  error(...args) {
    return this.#log('error', ...args)
  }

  /**
   * Creates a log of type fatal in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  fatal(...args) {
    return this.#log('fatal', ...args)
  }

  /**
   * Get a new instance of any log driver
   * with vanilla configurations. By default,
   * vanilla logger will use the "console" driver
   * and "none" formatter.
   *
   * @param {any} [configs]
   * @return {VanillaLogger}
   */
  static getVanillaLogger(configs = {}) {
    return new VanillaLogger(configs)
  }
}
