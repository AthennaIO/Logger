/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { FactoryHelper } from '#src/Helpers/FactoryHelper'

export class SimpleFormatter {
  /**
   * The last timestamp.
   *
   * @type {number}
   */
  #lastTimestamp

  /**
   * Format the message.
   *
   * @param {string} message
   * @param {{ level: 'info'|'INFO'|'debug'|'DEBUG'|'warn'|'WARN'|'error'|'ERROR'|'success'|'SUCCESS', chalk: import('chalk').ChalkInstance }} options
   * @return {string}
   */
  format(message, options) {
    const timestampDiff = FactoryHelper.getTimestampDiff(this.#lastTimestamp)
    this.#lastTimestamp = Date.now()

    const timestamp = FactoryHelper.getTimestamp()
    const level = FactoryHelper.paintByLevel(
      options.level.toLowerCase(),
      `[${options.level.toUpperCase()}]`,
    )

    return `${level} - ${timestamp} ${options.chalk(message)}${timestampDiff}`
  }
}
