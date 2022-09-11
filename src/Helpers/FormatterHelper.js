/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { hostname } from 'node:os'
import { ColorHelper } from '#src/Helpers/ColorHelper'

export class FormatterHelper {
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
      trace: '\u{1F43E}',
      debug: '\u{1F50E}',
      info: '\u{2139}',
      success: '\u{2705}',
      warn: '\u{26A0}',
      error: '\u{274C}',
      fatal: '\u{1F6D1}',
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
  static paintMessageByLevel(level, message) {
    const levelLower = level.toLowerCase()

    const levelColors = {
      trace: ColorHelper.trace,
      debug: ColorHelper.debug,
      info: ColorHelper.info,
      success: ColorHelper.success,
      warn: ColorHelper.warn,
      error: ColorHelper.error,
      fatal: ColorHelper.fatal,
    }

    if (!levelColors[levelLower]) {
      return message
    }

    return levelColors[levelLower](message)
  }

  /**
   * Get the PID string value.
   *
   * @return {string}
   */
  static pid() {
    return process.pid.toString()
  }

  /**
   * Get the timestamp string value.
   *
   * @return {string}
   */
  static timestamp() {
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
   * Get the hostname string value.
   *
   * @return {string}
   */
  static hostname() {
    return hostname()
  }
}
