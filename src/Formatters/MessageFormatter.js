/* eslint-disable prettier/prettier */
/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { FormatterHelper } from '#src/Helpers/FormatterHelper'

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
    const timestampDiff = FormatterHelper.getTimestampDiff(this.#lastTimestamp)

    this.#lastTimestamp = Date.now()

    const level = FormatterHelper.getEmojiByLevel(
      options.level,
      options.customEmoji,
    )

    return `${level} ${message}${timestampDiff}`
  }
}
