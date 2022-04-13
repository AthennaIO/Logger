/* eslint-disable prettier/prettier */
/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color } from 'src/Utils/Color'
import { LevelTypes } from 'src/Contracts/LevelTypes'
import { FormatterContract } from 'src/Contracts/FormatterContract'

export interface MessageFormatterOpts {
  level: LevelTypes
  customEmoji: string
}

export class MessageFormatter implements FormatterContract {
  private static lastTimestamp?: number

  private static getTimestampDiff() {
    let result = ''

    if (this.lastTimestamp) {
      result = Color.yellow(` +${Date.now() - this.lastTimestamp}ms`)
    }

    this.lastTimestamp = Date.now()

    return result
  }

  private static getEmojiByLevel(level: string, customEmoji?: string) {
    if (customEmoji) return customEmoji

    const levelEmojis = {
      info: '\u{2139}',
      debug: '\u{1F50E}',
      warn: '\u{26A0}',
      error: '\u{274C}',
      success: '\u{2705}',
    }

    if (!levelEmojis[level.toLowerCase()]) return ''

    return levelEmojis[level.toLowerCase()]
  }

  format(message: string, options: MessageFormatterOpts): string {
    const timestampDiff = MessageFormatter.getTimestampDiff()
    const level = MessageFormatter.getEmojiByLevel(
      options.level,
      options.customEmoji,
    )

    return `${level} ${message}${timestampDiff}`
  }
}
