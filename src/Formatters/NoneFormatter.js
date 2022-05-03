/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class NoneFormatter {
  /**
   * Format the message.
   *
   * @param {string} message
   * @param {any} [_options]
   * @return {string}
   */
  format(message, _options) {
    return message
  }
}
