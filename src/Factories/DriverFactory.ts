/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@secjs/utils'
import { FileDriver } from 'src/Drivers/FileDriver'
import { DebugDriver } from 'src/Drivers/DebugDriver'
import { ConsoleDriver } from 'src/Drivers/ConsoleDriver'
import { DriverContract } from 'src/Contracts/DriverContract'
import { NotFoundDriverException } from 'src/Exceptions/NotFoundDriverException'
import { DriverAlreadyExistException } from 'src/Exceptions/DriverAlreadyExistException'
import { ChannelNotConfiguredException } from 'src/Exceptions/ChannelNotConfiguredException'

export interface DriverObject {
  Driver: any
}

export class DriverFactory {
  private static drivers: Map<string, DriverObject> = new Map()
    .set('file', { Driver: FileDriver })
    .set('debug', { Driver: DebugDriver })
    .set('console', { Driver: ConsoleDriver })

  static availableDrivers(): string[] {
    const availableDrivers: string[] = []

    for (const [key] of this.drivers.entries()) {
      availableDrivers.push(key)
    }

    return availableDrivers
  }

  static fabricate(
    channelName: string,
    runtimeConfig: any = {},
  ): DriverContract {
    if (channelName === 'default') {
      channelName = Config.get('logging.default') as string
    }

    const channelConfig = this.getChannelConfig(channelName)
    const driverObject = this.drivers.get(channelConfig.driver)

    if (!driverObject) {
      throw new NotFoundDriverException(channelConfig.driver)
    }

    return new driverObject.Driver(channelName, runtimeConfig)
  }

  static createDriver(
    name: string,
    driver: new (channel: string, configs?: any) => DriverContract,
  ) {
    if (this.drivers.has(name)) {
      throw new DriverAlreadyExistException(name)
    }

    this.drivers.set(name, { Driver: driver })
  }

  private static getChannelConfig(channelName: string) {
    const channelConfig = Config.get(`logging.channels.${channelName}`)

    if (!channelConfig) {
      throw new ChannelNotConfiguredException(channelName)
    }

    if (!this.drivers.has(channelConfig.driver)) {
      throw new NotFoundDriverException(channelConfig.driver)
    }

    return channelConfig
  }
}
