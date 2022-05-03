/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Options } from '@secjs/utils'

import { ColorHelper } from '#src/Helpers/ColorHelper'

export class FactoryHelper {
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
      critical: '\u{1F6D1}',
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
      success: ColorHelper.success,
      critical: ColorHelper.critical,
    }

    if (!levelColors[level]) {
      return message
    }

    return levelColors[level](message)
  }

  /**
   * Group the configuration values.
   *
   * @param {any} object
   * @param {any} defaultValue
   * @return {any}
   */
  static groupConfigs(object, defaultValue) {
    const formatter = object.formatter || defaultValue.formatter
    const formatterConfig = Options.create(
      object.formatterConfig,
      defaultValue.formatterConfig,
    )

    const driverConfig = Options.create(object, defaultValue)

    return { ...driverConfig, formatter, formatterConfig }
  }
}