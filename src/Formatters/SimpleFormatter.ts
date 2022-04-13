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

export interface SimpleFormatterOpts {
  chalk: Chalk
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

    if (!levelColors[level.toLowerCase()]) return `[${level.toUpperCase()}]`

    return levelColors[level.toLowerCase()](`[${level.toUpperCase()}]`)
  }

  format(message: string, options: SimpleFormatterOpts): string {
    const timestamp = getTimestamp()
    const timestampDiff = SimpleFormatter.getTimestampDiff()
    const level = SimpleFormatter.paintByLevel(options.level)

    return `${level} - ${timestamp} ${options.chalk(message)}${timestampDiff}`
  }
}
