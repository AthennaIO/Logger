/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Driver } from '#src/Drivers/Driver'

export class NullDriver extends Driver {
  /**
   * Creates a new instance of NullDriver.
   *
   * @param {string} configs
   * @return {NullDriver}
   */
  constructor(configs) {
    super(configs)
  }

  /**
   * Transport the log.
   *
   * @param {string} level
   * @param {string} message
   * @return {any}
   */
  transport(level, message) {
    return null
  }
}
