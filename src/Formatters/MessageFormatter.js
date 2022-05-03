/* eslint-disable prettier/prettier */
/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { FactoryHelper } from '#src/Helpers/FactoryHelper'

export class MessageFormatter {
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
   * @param {{ level: 'info'|'INFO'|'debug'|'DEBUG'|'warn'|'WARN'|'error'|'ERROR'|'success'|'SUCCESS', customEmoji: string }} options
   * @return {string}
   */
  format(message, options) {
    const timestampDiff = FactoryHelper.getTimestampDiff(this.#lastTimestamp)

    this.#lastTimestamp = Date.now()

    const level = FactoryHelper.getEmojiByLevel(
      options.level,
      options.customEmoji,
    )

    return `${level} ${message}${timestampDiff}`
  }
}
