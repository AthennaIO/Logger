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
import { LevelTypes } from 'src/Contracts/LevelTypes'
import { FormatterContract } from 'src/Contracts/FormatterContract'

export interface CliFormatterOptions {
  chalk: Chalk
  level: LevelTypes
}

export class CliFormatter implements FormatterContract {
  private static paintByLevel(level: string) {
    const levelColors = {
      info: Color.info,
      debug: Color.debug,
      warn: Color.warning,
      error: Color.error,
      success: Color.log,
    }

    if (!levelColors[level.toLowerCase()]) return `[  ${level.toLowerCase()}  ]`

    return levelColors[level.toLowerCase()](`[  ${level.toLowerCase()}  ]`)
  }

  format(message: string, options: CliFormatterOptions): string {
    const level = CliFormatter.paintByLevel(options.level)

    return `${level} ${message}`
  }
}
