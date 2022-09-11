/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Telegraf } from 'telegraf'
import { Driver } from '#src/Drivers/Driver'

export class TelegramDriver extends Driver {
  /**
   * Creates a new instance of TelegramDriver.
   *
   * @param {any} configs
   * @return {TelegramDriver}
   */
  constructor(configs) {
    super(configs)
  }

  /**
   * Transport the log.
   *
   * @param {string} level
   * @param {string} message
   * @return {Promise<void>}
   */
  async transport(level, message) {
    if (!this.couldBeTransported(level)) {
      return
    }

    const formatted = this.format(level, message)

    await new Telegraf(this.driverConfig.token).telegram.sendMessage(
      this.driverConfig.chatId,
      this.clean(formatted),
      {
        parse_mode: this.driverConfig.parseMode,
      },
    )
  }
}
