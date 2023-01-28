/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Driver } from '#src/Drivers/Driver'
import { ColorHelper } from '#src/Helpers/ColorHelper'
import { VanillaLogger } from '#src/Logger/VanillaLogger'
import { DriverFactory } from '#src/Factories/DriverFactory'

export class Logger {
  /**
   * The drivers responsible for transporting the logs.
   */
  private drivers = []

  /**
   * Runtime configurations to be used inside the Drivers and Formatters.
   */
  private runtimeConfigs = {}

  public constructor() {
    if (!Config.exists(`logging.channels.${Config.get('logging.default')}`)) {
      return this
    }

    this.drivers.push(DriverFactory.fabricate('default', this.runtimeConfigs))
  }

  /**
   * Set runtime configurations for drivers and
   * formatters.
   */
  public config(runtimeConfigs: any) {
    this.runtimeConfigs = runtimeConfigs

    return this
  }

  /**
   * Change the log channel.
   */
  public channel(...channels: string[]) {
    this.drivers = []

    channels.forEach(c => {
      this.drivers.push(DriverFactory.fabricate(c, this.runtimeConfigs))
    })

    return this
  }

  /**
   * Call drivers to transport the log.
   */
  private async log(level: string, ...args: any[]): Promise<any> {
    const message = ColorHelper.applyLogEngine(...args)

    const promises = this.drivers.map((driver: Driver) =>
      driver.transport(level, message),
    )

    return Promise.all(promises)
  }

  /**
   * Creates a log of type trace in channel.
   */
  public trace(...args: any[]): any | Promise<any> {
    return this.log('trace', ...args)
  }

  /**
   * Creates a log of type debug in channel.
   */
  public debug(...args): any | Promise<any> {
    return this.log('debug', ...args)
  }

  /**
   * Creates a log of type info in channel.
   */
  public info(...args: any[]): any | Promise<any> {
    return this.log('info', ...args)
  }

  /**
   * Creates a log of type success in channel.
   */
  public success(...args: any[]): any | Promise<any> {
    return this.log('success', ...args)
  }

  /**
   * Creates a log of type warn in channel.
   */
  public warn(...args: any[]): any | Promise<any> {
    return this.log('warn', ...args)
  }

  /**
   * Creates a log of type error in channel.
   */
  public error(...args: any[]): any | Promise<any> {
    return this.log('error', ...args)
  }

  /**
   * Creates a log of type fatal in channel.
   */
  public fatal(...args: any[]): any | Promise<any> {
    return this.log('fatal', ...args)
  }

  /**
   * Get a new instance of any log driver
   * with vanilla configurations. By default,
   * vanilla logger will use the "console" driver
   * and "none" formatter.
   */
  public static getVanillaLogger(configs: any = {}): VanillaLogger {
    return new VanillaLogger(configs)
  }
}
