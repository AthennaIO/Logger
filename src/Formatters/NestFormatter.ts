/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Chalk } from 'chalk'
import { Color } from 'src/Utils/Color'
import { getTimestamp } from 'src/Utils/getTimestamp'
import { FormatterContract } from 'src/Contracts/FormatterContract'

export interface ContextFormatterOptions {
  chalk: Chalk
  context: string
}

export class NestFormatter implements FormatterContract {
  private static lastTimestamp?: number

  private static getTimestampDiff() {
    let result = ''

    if (this.lastTimestamp) {
      result = Color.yellow(` +${Date.now() - this.lastTimestamp}ms`)
    }

    this.lastTimestamp = Date.now()

    return result
  }

  format(message: string, options: ContextFormatterOptions): string {
    const pid = Color.yellow(`[Athenna] - PID: ${process.pid}`)
    const timestamp = getTimestamp()
    const messageCtx = Color.yellow(`[${options.context}] `)
    const timestampDiff = NestFormatter.getTimestampDiff()

    return `${pid} - ${timestamp} ${messageCtx}${options.chalk(
      message,
    )}${timestampDiff}`
  }
}
