/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class NullDriver {
  /**
   * Creates a new instance of NullDriver.
   *
   * @param {string} _channel
   * @param {any} [_configs]
   * @return {NullDriver}
   */
  constructor(_channel, _configs = {}) {}

  /**
   * Transport the log.
   *
   * @param {string} _message
   * @param {any} [_options]
   * @return {void}
   */
  transport(_message, _options) {}
}
