/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { getTimestamp } from 'src/Utils/getTimestamp'
import { FormatterHelper } from '#src/Helpers/FormatterHelper'
import { ColorHelper } from '#src/Helpers/ColorHelper'

export class NestFormatter {
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
   * @param {{ context: string, chalk: import('chalk').ChalkInstance }} options
   * @return {string}
   */
  format(message, options) {
    const timestampDiff = FormatterHelper.getTimestampDiff(this.#lastTimestamp)

    this.#lastTimestamp = Date.now()

    const pid = ColorHelper.yellow(`[Athenna] - PID: ${process.pid}`)
    const timestamp = getTimestamp()
    const messageCtx = ColorHelper.yellow(`[${options.context}] `)

    return `${pid} - ${timestamp} ${messageCtx}${options.chalk(
      message,
    )}${timestampDiff}`
  }
}
