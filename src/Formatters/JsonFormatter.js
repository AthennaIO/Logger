/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ColorHelper } from '#src/index'

export class JsonFormatter {
  /**
   *
   * @param {Record<any, any>} message
   * @param {{ chalk: import('chalk').ChalkInstance }} options
   * @return {string}
   */
  format(message, options) {
    const jsonSpaced = JSON.stringify(message, null, 2)

    return `${ColorHelper.bold('JSON:')} ${options.chalk(jsonSpaced)}`
  }
}
