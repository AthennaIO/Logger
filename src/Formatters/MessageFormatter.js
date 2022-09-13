/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Formatter } from '#src/Formatters/Formatter'

export class MessageFormatter extends Formatter {
  /**
   * Format the message.
   *
   * @param {string} message
   * @return {string}
   */
  format(message) {
    return this.clean(
      `${this.messageLevel()} - (${this.pid()}) - (${this.hostname()}): ${this.toString(
        message,
      )}`,
    )
  }
}
