/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { hostname } from 'node:os'

import { Is } from '@secjs/utils'

import { ColorHelper } from '#src/Helpers/ColorHelper'

export class Formatter {
  /**
   * Holds the configuration object of formatter.
   */
  configs = {}

  /**
   * Creates a new instance of Formatter.
   *
   * @param {any} configs
   * @return {Formatter}
   */
  config(configs) {
    this.configs = configs

    return this
  }

  /**
   * Format the message.
   *
   * @param {string} message
   * @return {string}
   */
  format(message) {}

  /**
   * Create the PID for formatter.
   *
   * @return {string}
   */
  pid() {
    return process.pid.toString()
  }

  /**
   * Create the hostname for formatter.
   *
   * @return {string}
   */
  hostname() {
    return hostname()
  }

  /**
   * Create the timestamp for formatter.
   *
   * @return {string}
   */
  timestamp() {
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
   * Transform the message to string.
   *
   * @param message {string}
   * @return {string}
   */
  toString(message) {
    if (Is.String(message)) {
      return message
    }

    if (Is.Object(message)) {
      message = JSON.stringify(message)
    }

    return `${message}`
  }

  /**
   * Clean the message removing colors if clean
   * option is true.
   *
   * @param message {string}
   * @return {string}
   */
  clean(message) {
    if (this.configs.clean) {
      return ColorHelper.removeColors(message)
    }

    return message
  }

  /**
   * Apply all colors necessary to message.
   *
   * @param message {string}
   * @return {string}
   */
  applyColors(message) {
    message = this.toString(message)

    return this.applyColorsByChalk(this.applyColorsByLevel(message))
  }

  /**
   * Apply colors in message.
   *
   * @param message {string}
   * @return {string}
   */
  applyColorsByChalk(message) {
    if (!this.configs.chalk) {
      return message
    }

    return this.configs.chalk(message)
  }

  /**
   * Apply colors in message by level.
   *
   * @param message {string}
   * @return {string}
   */
  applyColorsByLevel(message) {
    const level = this.configs.level

    return this.paintMessageByLevel(level, message)
  }

  /**
   * Create the cli level string.
   *
   * @return {string}
   */
  cliLevel() {
    const level = this.configs.level

    if (!ColorHelper[level]) {
      return level
    }

    return ColorHelper[level].bold(`[  ${level}  ]`)
  }

  /**
   * Create the simple level string.
   *
   * @return {string}
   */
  simpleLevel() {
    const level = this.configs.level

    if (!ColorHelper[level]) {
      return level
    }

    return ColorHelper[level].bold(`[${level.toUpperCase()}]`)
  }

  /**
   * Create the message level emoji string.
   *
   * @return {string}
   */
  messageLevel() {
    const level = this.configs.level

    return this.getEmojiByLevel(level, this.configs.customEmoji)
  }

  /**
   * Get the emoji by level.
   *
   * @param {string} level
   * @param {string} [customEmoji]
   * @return {string}
   */
  getEmojiByLevel(level, customEmoji) {
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
  paintMessageByLevel(level, message) {
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
}
