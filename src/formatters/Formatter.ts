/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import rTracer from 'cls-rtracer'

import { hostname } from 'node:os'
import { Is, Color } from '@athenna/common'

export abstract class Formatter {
  /**
   * Holds the configuration object of formatter.
   */
  public configs: any = {}

  /**
   * Creates a new instance of Formatter.
   */
  public config(configs: any): Formatter {
    this.configs = configs

    return this
  }

  /**
   * Format the message.
   */
  public abstract format(message: any): string

  /**
   * Create the PID for formatter.
   */
  public pid(): string {
    return process.pid.toString()
  }

  /**
   * Create the hostname for formatter.
   */
  public hostname(): string {
    return hostname()
  }

  /**
   * Get the level without any color or format.
   */
  public level(): string {
    return this.configs.level
  }

  /**
   * Get the trace id for formatter.
   */
  public traceId(): string | null {
    return (rTracer.id() || null) as any
  }

  /**
   * Create the timestamp for formatter.
   */
  public timestamp(): string {
    const localeStringOptions: any = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit'
    }

    return new Date(Date.now()).toLocaleString(undefined, localeStringOptions)
  }

  /**
   * Transform the message to string.
   */
  public toString(message: string): string {
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
   * option is true. If force is true, then colors
   * will be removed even if configs clean option
   * is false.
   */
  public clean(message: string, force = false): string {
    if (this.configs.clean || force) {
      return Color.removeColors(message)
    }

    return message
  }

  /**
   * Apply all colors necessary to message.
   */
  public applyColors(message: string): string {
    message = this.toString(message)

    return this.applyColorsByChalk(this.applyColorsByLevel(message))
  }

  /**
   * Apply colors in message.
   */
  public applyColorsByChalk(message: string): string {
    if (!this.configs.chalk) {
      return message
    }

    return this.configs.chalk(message)
  }

  /**
   * Apply colors in message by level.
   */
  public applyColorsByLevel(message: string): string {
    const level = this.configs.level

    return this.paintMessageByLevel(level, message)
  }

  /**
   * Create the cli level string.
   */
  public cliLevel(): string {
    const level = this.configs.level

    if (!Color[level]) {
      return Color.bold(`[  ${level}  ]`)
    }

    return Color[level].bold(`[  ${level}  ]`)
  }

  /**
   * Create the simple level string.
   */
  public simpleLevel(): string {
    const level = this.configs.level

    if (!Color[level]) {
      return Color.bold(`[${level.toUpperCase()}]`)
    }

    return Color[level].bold(`[${level.toUpperCase()}]`)
  }

  /**
   * Create the message level emoji string.
   */
  public messageLevel(): string {
    const level = this.configs.level

    return this.getEmojiByLevel(level, this.configs.customEmoji)
  }

  /**
   * Get the emoji by level.
   */
  public getEmojiByLevel(level: string, customEmoji?: string): string {
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
      fatal: '\u{1F6D1}'
    }

    if (!levelEmojis[level.toLowerCase()]) {
      return ''
    }

    return levelEmojis[level.toLowerCase()]
  }

  /**
   * Paint the message by level.
   */
  public paintMessageByLevel(level: string, message: string): string {
    const levelLower = level.toLowerCase()

    const levelColors = {
      trace: Color.trace,
      debug: Color.debug,
      info: Color.info,
      success: Color.success,
      warn: Color.warn,
      error: Color.error,
      fatal: Color.fatal
    }

    if (!levelColors[levelLower]) {
      return message
    }

    return levelColors[levelLower](message)
  }
}
