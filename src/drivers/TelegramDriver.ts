/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Telegraf } from 'telegraf'
import { Driver } from '#src/drivers/Driver'
import { debug } from '#src/debug'

export class TelegramDriver extends Driver {
  public async transport(level: string, message: any): Promise<any> {
    if (!this.couldBeTransported(level)) {
      return
    }

    const formatted = this.format(level, message, true)

    debug(
      '[%s] Transporting logs with parse mode as %s, using %s token and %s chatId.',
      TelegramDriver.name,
      this.driverConfig.parseMode,
      this.driverConfig.token,
      this.driverConfig.chatId
    )

    return new Telegraf(this.driverConfig.token).telegram.sendMessage(
      this.driverConfig.chatId,
      formatted,
      {
        parse_mode: this.driverConfig.parseMode
      }
    )
  }
}
