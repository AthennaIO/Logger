/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color } from '@athenna/common'
import { Driver } from '#src/Drivers/Driver'
import { DriverFactory } from '#src/Factories/DriverFactory'

export class VanillaLogger {
  /**
   * The driver responsible for transporting the logs.
   */
  public drivers = []

  public constructor(configs: any) {
    this.drivers.push(DriverFactory.fabricateVanilla(configs))
  }

  /**
   * Log a simple log message without using the log driver
   * but using the Color engine.
   */
  public simple(...args: any[]): void {
    process.stdout.write(Color.apply(...args).concat('\n'))
  }

  /**
   * Set runtime configurations for drivers and
   * formatters.
   */
  public config(): VanillaLogger {
    return this
  }

  /**
   * Change the log channel.
   */
  public channel(): VanillaLogger {
    return this
  }

  /**
   * Call drivers to transport the log.
   *
   * @param {string} level
   * @param {string} args
   * @return {any | Promise<any>}
   */
  private log(level: string, ...args: any[]): any | Promise<any> {
    const message = Color.apply(...args)

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
}
