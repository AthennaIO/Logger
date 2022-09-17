/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@secjs/utils'

import { FactoryHelper } from '#src/index'
import { FileDriver } from '#src/Drivers/FileDriver'
import { NullDriver } from '#src/Drivers/NullDriver'
import { SlackDriver } from '#src/Drivers/SlackDriver'
import { StackDriver } from '#src/Drivers/StackDriver'
import { ConsoleDriver } from '#src/Drivers/ConsoleDriver'
import { DiscordDriver } from '#src/Drivers/DiscordDriver'
import { TelegramDriver } from '#src/Drivers/TelegramDriver'
import { DriverExistException } from '#src/Exceptions/DriverExistException'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/Exceptions/NotImplementedConfigException'

export class DriverFactory {
  /**
   * Drivers of DriverFactory.
   *
   * @type {Map<string, { Driver: any }>}
   */
  static #drivers = new Map()
    .set('file', { Driver: FileDriver })
    .set('null', { Driver: NullDriver })
    .set('slack', { Driver: SlackDriver })
    .set('stack', { Driver: StackDriver })
    .set('console', { Driver: ConsoleDriver })
    .set('discord', { Driver: DiscordDriver })
    .set('telegram', { Driver: TelegramDriver })

  /**
   * Return an array with all available drivers.
   *
   * @return {any[]}
   */
  static availableDrivers() {
    const availableDrivers = []

    for (const key of this.#drivers.keys()) {
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
    const channelConfig = this.#getChannelConfig(channelName)

    const { Driver } = this.#drivers.get(channelConfig.driver)

    const configs = FactoryHelper.groupConfigs(runtimeConfig, channelConfig)

    return new Driver(configs)
  }

  /**
   * Creates a new driver implementation.
   *
   * @param {string} name
   * @param {(channel: string, configs?: any) => any} driver
   */
  static createDriver(name, driver) {
    if (this.#drivers.has(name)) {
      throw new DriverExistException(name)
    }

    this.#drivers.set(name, { Driver: driver })
  }

  /**
   * Get all the configuration of a channel.
   *
   * @param {string} channelName
   * @return {any}
   */
  static #getChannelConfig(channelName) {
    if (channelName === 'default') {
      channelName = Config.get('logging.default')
    }

    const channelConfig = Config.get(`logging.channels.${channelName}`)

    if (!channelConfig) {
      throw new NotImplementedConfigException(channelName)
    }

    if (!this.#drivers.has(channelConfig.driver)) {
      throw new NotFoundDriverException(channelConfig.driver)
    }

    return channelConfig
  }
}
