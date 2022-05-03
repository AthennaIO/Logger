/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { FactoryHelper } from '#src/Helpers/FactoryHelper'

export class CliFormatter {
  /**
   * Format the message.
   *
   * @param {string} message
   * @param {{ level: 'info'|'INFO'|'debug'|'DEBUG'|'warn'|'WARN'|'error'|'ERROR'|'success'|'SUCCESS', chalk: import('chalk').ChalkInstance }} options
   * @return {string}
   */
  format(message, options) {
    options.level = options.level.toLowerCase()

    const level = FactoryHelper.paintByLevel(
      options.level,
      `[  ${options.level}  ]`,
    )

    return `${level} ${message}`
  }
}
