/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Driver } from '#src/drivers/Driver'
import { Color, Json, Macroable } from '@athenna/common'
import { DriverFactory } from '#src/factories/DriverFactory'
import { VANILLA_CHANNELS } from '#src/constants/VanillaChannels'

export class Logger extends Macroable {
  /**
   * The drivers responsible for transporting the logs.
   */
  private drivers = []

  /**
   * Runtime configurations to be used inside the Drivers and Formatters.
   */
  private runtimeConfigs: any = {}

  /**
   * Store the current logger strategy so config() and create()
   * can clone the logger preserving its behavior.
   */
  private selection: { method: 'channel' | 'vanilla'; values: any[] } = {
    method: 'vanilla',
    values: []
  }

  public constructor() {
    super()
    this.channelOrVanilla(Config.get('logging.default'))
  }

  /**
   * Create a new standalone logger instance. Very
   * useful to create new loggers without changing the
   * channels that are already defined in the main instance.
   */
  public static standalone(...configs: any[]) {
    const logger = new Logger()

    logger.vanilla(...configs)

    return logger
  }

  /**
   * Set runtime configurations for drivers and
   * formatters.
   */
  public config(runtimeConfigs: any): Logger {
    this.runtimeConfigs = Json.copy(runtimeConfigs || {})

    return this.applySelection()
  }

  /**
   * Create a new logger instance inheriting the current
   * configuration and adding default message content.
   */
  public create(defaults: any = {}): Logger {
    const logger = new Logger()
    const runtimeConfigs: any = Json.copy(this.runtimeConfigs)

    if (!runtimeConfigs.formatterConfig) {
      runtimeConfigs.formatterConfig = {} 
    }

    runtimeConfigs.formatterConfig.defaults = Json.copy(defaults) 

    logger.selection = {
      method: this.selection.method,
      values: Json.copy(this.selection.values)
    }

    return logger.config(runtimeConfigs)
  }

  /**
   * Change the log channel.
   */
  public channel(...channels: string[]): Logger {
    this.drivers = []
    this.selection = {
      method: 'channel',
      values: [...channels]
    }

    channels.forEach(channel => {
      const driver = DriverFactory.fabricate(channel, this.runtimeConfigs)

      this.drivers.push(driver)
    })

    return this
  }

  /**
   * Change the log drivers using vanilla configurations.
   * This method does not depend in Athenna configuration
   * files to be executed.
   */
  public vanilla(...configs: any[]): Logger {
    this.drivers = []
    this.selection = {
      method: 'vanilla',
      values: Json.copy(configs)
    }

    if (!configs.length) {
      this.drivers.push(DriverFactory.fabricateVanilla(this.runtimeConfigs))

      return this
    }

    configs.forEach(config => {
      const driver = DriverFactory.fabricateVanilla({ ...config, ...this.runtimeConfigs })

      this.drivers.push(driver)
    })

    return this
  }

  /**
   * Verify if channel configuration exists. If not, Athenna will
   * use the default vanilla configurations as drivers.
   */
  public channelOrVanilla(channel: string, configs = {}): Logger {
    if (Config.exists(`logging.channels.${channel}`)) {
      return this.channel(channel)
    }

    return this.vanilla({
      ...VANILLA_CHANNELS[channel],
      ...configs
    })
  }

  /**
   * Create a new standalone logger instance. Very
   * useful to create new loggers without changing the
   * channels that are already defined in the main instance.
   */
  public standalone(...configs: any[]) {
    return Logger.standalone(...configs)
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
  public debug(...args: any[]): any | Promise<any> {
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
   * Call drivers to transport the log.
   */
  private async log(level: string, ...args: any[]): Promise<any> {
    const message = Color.apply(...args)

    const promises = this.drivers.map((driver: Driver) =>
      driver.transport(level, message)
    )

    return Promise.all(promises)
  }

  /**
   * Rebuild drivers using the current logger selection.
   */
  private applySelection() {
    return this[this.selection.method](...Json.copy(this.selection.values))
  }
}
