/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Options } from '@athenna/common'
import { Driver } from '#src/Drivers/Driver'
import { FileDriver } from '#src/Drivers/FileDriver'
import { NullDriver } from '#src/Drivers/NullDriver'
import { SlackDriver } from '#src/Drivers/SlackDriver'
import { StackDriver } from '#src/Drivers/StackDriver'
import { ConsoleDriver } from '#src/Drivers/ConsoleDriver'
import { DiscordDriver } from '#src/Drivers/DiscordDriver'
import { FactoryHelper } from '#src/Helpers/FactoryHelper'
import { TelegramDriver } from '#src/Drivers/TelegramDriver'
import { DriverExistException } from '#src/Exceptions/DriverExistException'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/Exceptions/NotImplementedConfigException'

export class DriverFactory {
  /**
   * Drivers of DriverFactory.
   */
  public static drivers: Map<string, { Driver: any }> = new Map()
    .set('file', { Driver: FileDriver })
    .set('null', { Driver: NullDriver })
    .set('slack', { Driver: SlackDriver })
    .set('stack', { Driver: StackDriver })
    .set('console', { Driver: ConsoleDriver })
    .set('discord', { Driver: DiscordDriver })
    .set('telegram', { Driver: TelegramDriver })

  /**
   * Return an array with all available drivers.
   */
  public static availableDrivers(): any[] {
    const availableDrivers: string[] = []

    for (const key of this.drivers.keys()) {
      availableDrivers.push(key)
    }

    return availableDrivers
  }

  /**
   * Fabricate a new instance of a driver based on
   * channel configurations.
   */
  public static fabricate(channelName: string, configs: any = {}): Driver {
    const channelConfig = this.getChannelConfig(channelName)

    const { Driver } = this.drivers.get(channelConfig.driver) as any

    return new Driver(FactoryHelper.groupConfigs(configs, channelConfig))
  }

  /**
   * Fabricate a new instance of a driver with vanilla
   * configurations.
   */
  public static fabricateVanilla(configs: any = {}): Driver {
    configs = Options.create(configs, {
      driver: 'console',
      formatter: 'none',
    })

    if (!this.drivers.has(configs.driver)) {
      throw new NotFoundDriverException(configs.driver)
    }

    const { Driver } = this.drivers.get(configs.driver) as any

    return new Driver(configs)
  }

  /**
   * Creates a new driver implementation.
   */
  public static createDriver(name: string, driver: typeof Driver): void {
    if (this.drivers.has(name)) {
      throw new DriverExistException(name)
    }

    this.drivers.set(name, { Driver: driver })
  }

  /**
   * Get all the configuration of a channel.
   */
  public static getChannelConfig(channelName: string): any {
    if (channelName === 'default') {
      channelName = Config.get('logging.default', channelName)
    }

    const channelConfig = Config.get(`logging.channels.${channelName}`)

    if (!channelConfig) {
      throw new NotImplementedConfigException(channelName)
    }

    if (!this.drivers.has(channelConfig.driver)) {
      throw new NotFoundDriverException(channelConfig.driver)
    }

    return channelConfig
  }
}
