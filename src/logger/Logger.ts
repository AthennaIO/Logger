/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color } from '@athenna/common'
import { Config } from '@athenna/config'
import { Driver } from '#src/drivers/Driver'
import { DriverFactory } from '#src/factories/DriverFactory'
import { VANILLA_CHANNELS } from '#src/constants/VanillaChannels'

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
    this.runtimeConfigs = runtimeConfigs

    return this
  }

  /**
   * Change the log channel.
   */
  public channel(...channels: string[]): Logger {
    this.drivers = []

    channels.forEach(channel => {
      this.drivers.push(DriverFactory.fabricate(channel, this.runtimeConfigs))
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

    if (!configs.length) {
      this.drivers.push(DriverFactory.fabricateVanilla())

      return this
    }

    configs.forEach(config => {
      this.drivers.push(DriverFactory.fabricateVanilla(config))
    })

    return this
  }

  /**
   * Verify if channel configuration exists. If not, Athenna will
   * use the default vanilla configurations as drivers.
   */
  public channelOrVanilla(channel: string, configs = {}): Logger {
    if (channel === 'default') {
      channel = Config.get(
        `logging.channels.${Config.get('logging.default')}`,
        'default',
      )
    }

    if (Config.exists(`logging.channels.${channel}`)) {
      return this.channel(channel)
    }

    return this.vanilla({
      ...VANILLA_CHANNELS[channel],
      ...configs,
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
      driver.transport(level, message),
    )

    return Promise.all(promises)
  }
}
