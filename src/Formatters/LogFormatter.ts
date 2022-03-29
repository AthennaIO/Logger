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

export interface LogFormatterOptions {
  color: Chalk
  level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'SUCCESS'
}

export class LogFormatter implements FormatterContract {
  format(message: string, options?: LogFormatterOptions): string {
    options = Object.assign({}, { color: Color.green, level: 'info' }, options)

    const pid = Color.yellow(`[Athenna] - PID: ${process.pid}`)
    const timestamp = getTimestamp()
    const level = LogFormatter.paintByLevel(options.level)

    return `${pid} - ${timestamp} ${level} ${options.color(message)}`
  }

  private static paintByLevel(level: string) {
    const levelColors = {
      info: Color.info,
      debug: Color.debug,
      warn: Color.warning,
      error: Color.error,
      success: Color.log,
    }

    return levelColors[level.toLowerCase()](`[${level}]`)
  }
}
