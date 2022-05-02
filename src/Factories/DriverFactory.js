/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@secjs/utils'

import { DriverExistException } from '#src/Exceptions/DriverExistException'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'
import { NotFoundChannelException } from '#src/Exceptions/NotFoundChannelException'

export class DriverFactory {
  /**
   * Drivers of DriverFactory.
   *
   * @type {Map<string, { Driver: any }>}
   */
  static drivers = new Map()
  // .set('file', { Driver: FileDriver })
  // .set('null', { Driver: NullDriver })
  // .set('pino', { Driver: PinoDriver })
  // .set('slack', { Driver: SlackDriver })
  // .set('debug', { Driver: DebugDriver })
  // .set('console', { Driver: ConsoleDriver })
  // .set('discord', { Driver: DiscordDriver })
  // .set('telegram', { Driver: TelegramDriver })

  /**
   * Return an array with all available drivers.
   *
   * @return {any[]}
   */
  static availableDrivers() {
    const availableDrivers = []

    for (const [key] of this.drivers.entries()) {
      availableDrivers.push(key)
    }

    return availableDrivers
  }

  /**
   * Fabricate a new instance of a driver based on
   * channel configurations.
   *
   * @param {string} channelName
   * @param {any} runtimeConfig
   * @return {any}
   */
  static fabricate(channelName, runtimeConfig = {}) {
    if (channelName === 'default') {
      channelName = Config.get('logging.default')
    }

    const channelConfig = this.#getChannelConfig(channelName)
    const driverObject = this.drivers.get(channelConfig.driver)

    if (!driverObject) {
      throw new NotFoundDriverException(channelConfig.driver)
    }

    return new driverObject.Driver(channelName, runtimeConfig)
  }

  /**
   * Creates a new driver implementation.
   *
   * @param {string} name
   * @param {(channel: string, configs?: any) => any} driver
   */
  static createDriver(name, driver) {
    if (this.drivers.has(name)) {
      throw new DriverExistException(name)
    }

    this.drivers.set(name, { Driver: driver })
  }

  /**
   * Get all the configuration of a channel.
   *
   * @param {string} channelName
   * @return {any}
   */
  static #getChannelConfig(channelName) {
    const channelConfig = Config.get(`logging.channels.${channelName}`)

    if (!channelConfig) {
      throw new NotFoundChannelException(channelName)
    }

    if (!this.drivers.has(channelConfig.driver)) {
      throw new NotFoundDriverException(channelConfig.driver)
    }

    return channelConfig
  }
}
