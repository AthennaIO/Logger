/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Formatter } from '#src/Formatters/Formatter'

export class SimpleFormatter extends Formatter {
  /**
   * Format the message.
   *
   * @param {string} message
   * @return {string}
   */
  format(message) {
    const pid = this.pid()
    const time = this.timestamp()
    const level = this.simpleLevel()
    const colorizedMsg = this.applyColors(message)

    return this.clean(`${level} - ${time} - (${pid}) ${colorizedMsg}`)
  }
}
