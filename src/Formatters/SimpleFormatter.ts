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
import { LevelTypes } from 'src/Contracts/LevelTypes'
import { FormatterContract } from 'src/Contracts/FormatterContract'

export interface LogFormatterOptions {
  color: Chalk
  level: LevelTypes
}

export class SimpleFormatter implements FormatterContract {
  private static lastTimestamp?: number

  private static getTimestampDiff() {
    let result = ''

    if (this.lastTimestamp) {
      result = Color.yellow(` +${Date.now() - this.lastTimestamp}ms`)
    }

    this.lastTimestamp = Date.now()

    return result
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

  format(message: string, options?: LogFormatterOptions): string {
    options = Object.assign({}, { color: Color.green, level: 'info' }, options)

    const timestamp = getTimestamp()
    const timestampDiff = SimpleFormatter.getTimestampDiff()
    const level = SimpleFormatter.paintByLevel(options.level)

    return `${level} - ${timestamp} ${options.color(message)}${timestampDiff}`
  }
}
