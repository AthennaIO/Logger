/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Json } from '@athenna/common'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

export abstract class Driver {
  /**
   * Holds the configuration object itself.
   */
  public configs: any = {}

  /**
   * Holds the configuration object of driver,
   */
  public driverConfig: any = {}

  /**
   * Holds the formatter string value.
   */
  public formatter = 'none'

  /**
   * Holds the configuration object of formatter.
   */
  public formatterConfig: any = {}

  /**
   * The max log level that this driver can transport.
   */
  public level = 'info'

  /**
   * The log level order to check if log could
   * be transported or not.
   */
  public levelOrder: string[] = [
    'trace',
    'debug',
    'info',
    'success',
    'warn',
    'error',
    'fatal',
  ]

  public constructor(configs: any = {}) {
    this.configs = configs

    const json = Json.copy(configs)

    delete json.formatter
    delete json.formatterConfig

    this.driverConfig = json
    this.level = json.level || 'info'
    this.formatter = configs.formatter || 'none'
    this.formatterConfig = configs.formatterConfig || {}
  }

  /**
   * Transport the log.
   */
  public abstract transport(level: string, message: any): any

  /**
   * Check if message could be transported.
   */
  public couldBeTransported(level: string): boolean {
    const levelIndex = this.levelOrder.indexOf(level)
    const maxLevelIndex = this.levelOrder.indexOf(this.level)

    return levelIndex >= maxLevelIndex
  }

  /**
   * Call formatter factory to format the message.
   */
  public format(level: string, message: any, clean = false): string {
    const formatterConfig = { level, clean, ...this.formatterConfig }

    return FormatterFactory.fabricate(this.formatter)
      .config(formatterConfig)
      .format(message)
  }

  /**
   * Get the stream type for level.
   */
  public getStreamTypeFor(level: string): string {
    if (this.driverConfig.streamType) {
      return this.driverConfig.streamType
    }

    let streamType = 'stdout'

    if (level === 'error' || level === 'fatal') {
      streamType = 'stderr'
    }

    return streamType
  }
}
