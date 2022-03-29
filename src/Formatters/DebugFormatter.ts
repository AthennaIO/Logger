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

export interface DebugFormatterOptions {
  color: Chalk
  context: string
  namespace: string
}

export class DebugFormatter implements FormatterContract {
  format(message: string, options?: DebugFormatterOptions): string {
    options = Object.assign(
      {},
      { color: Color.green, context: 'Debugger', namespace: 'api:main' },
      options,
    )

    const pid = Color.purple(`[Athenna Debugger] - PID: ${process.pid}`)
    const timestamp = Color.white(getTimestamp())
    const messageCtx = Color.yellow(`[${options.context}] `)
    const timestampDiff = DebugFormatter.getTimestampDiff()

    return `${pid} - ${timestamp} ${messageCtx}${options.color(
      message,
    )}${timestampDiff}`
  }

  private static lastTimestamp?: number

  private static getTimestampDiff() {
    let result = ''

    if (this.lastTimestamp) {
      result = Color.yellow(` +${Date.now() - this.lastTimestamp}ms`)
    }

    this.lastTimestamp = Date.now()

    return result
  }
}
