/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Formatter } from '#src/Formatters/Formatter'

export class CliFormatter extends Formatter {
  /**
   * Format the message.
   *
   * @param {string} message
   * @return {string}
   */
  format(message) {
    const level = this.cliLevel()

    return this.clean(`${level} ${this.toString(message)}`)
  }
}
