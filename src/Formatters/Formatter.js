/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Is } from '@secjs/utils'

import { ColorHelper } from '#src/index'
import { FormatterHelper } from '#src/Helpers/FormatterHelper'

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
   * Create the PID for formatter.
   *
   * @return {string}
   */
  pid() {
    return FormatterHelper.pid()
  }

  /**
   * Create the hostname for formatter.
   *
   * @return {string}
   */
  hostname() {
    return FormatterHelper.hostname()
  }

  /**
   * Create the timestamp for formatter.
   *
   * @return {string}
   */
  timestamp() {
    return FormatterHelper.timestamp()
  }

  /**
   * Transform the message to string.
   *
   * @param message {string}
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

    return FormatterHelper.paintMessageByLevel(level, message)
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

    return FormatterHelper.getEmojiByLevel(level, this.configs.customEmoji)
  }
}
