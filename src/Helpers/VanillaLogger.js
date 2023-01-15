/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ColorHelper } from '#src/index'
import { DriverFactory } from '#src/Factories/DriverFactory'

export class VanillaLogger {
  /**
   * The driver responsible for transporting the logs.
   *
   * @type {any[]}
   */
  #drivers = []

  /**
   * Creates a new instance of ConsoleLogger.
   *
   * @param {any} [configs]
   * @return {VanillaLogger}
   */
  constructor(configs) {
    this.#drivers.push(DriverFactory.fabricateVanilla(configs))
  }

  /**
   * Set runtime configurations for drivers and
   * formatters.
   *
   * @return {VanillaLogger}
   */
  config() {
    return this
  }

  /**
   * Change the log channel.
   *
   * @return {VanillaLogger}
   */
  channel() {
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
}
