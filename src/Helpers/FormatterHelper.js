import { ColorHelper } from '#src/Helpers/ColorHelper'

/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class FormatterHelper {
  /**
   * Get the timestamp value formatted.
   *
   * @return {string}
   */
  static getTimestamp() {
    const localeStringOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    }

    return new Date(Date.now()).toLocaleString(undefined, localeStringOptions)
  }

  /**
   * Get the timestamp diff between logs.
   *
   * @param {number} lastTimestamp
   * @return {string}
   */
  static getTimestampDiff(lastTimestamp) {
    let timestampDiff = ''

    if (lastTimestamp) {
      timestampDiff = ColorHelper.yellow(` +${Date.now() - lastTimestamp}ms`)
    }

    return timestampDiff
  }

  /**
   * Get the emoji by level.
   *
   * @param {string} level
   * @param {string} [customEmoji]
   * @return {string}
   */
  static getEmojiByLevel(level, customEmoji) {
    if (customEmoji) {
      return customEmoji
    }

    const levelEmojis = {
      info: '\u{2139}',
      debug: '\u{1F50E}',
      warn: '\u{26A0}',
      error: '\u{274C}',
      success: '\u{2705}',
    }

    if (!levelEmojis[level.toLowerCase()]) {
      return ''
    }

    return levelEmojis[level.toLowerCase()]
  }

  /**
   * Paint the message by level.
   *
   * @param {string} level
   * @param {string} message
   * @return {string}
   */
  static paintByLevel(level, message) {
    level = level.toLowerCase()

    const levelColors = {
      info: ColorHelper.info,
      debug: ColorHelper.debug,
      warn: ColorHelper.warning,
      error: ColorHelper.error,
      success: ColorHelper.log,
    }

    if (!levelColors[level]) {
      return message
    }

    return levelColors[level](message)
  }
}
