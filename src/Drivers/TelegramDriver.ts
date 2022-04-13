/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Telegraf } from 'telegraf'
import { Config } from '@secjs/utils'
import { Color } from 'src/Utils/Color'
import { groupConfigs } from 'src/Utils/groupConfigs'
import { DriverContract } from 'src/Contracts/DriverContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface TelegramDriverOpts {
  token?: string
  chatId?: string | number
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2'
  formatter?: any
  formatterConfig?: any
}

export class TelegramDriver implements DriverContract {
  public configs: Required<TelegramDriverOpts>

  public constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = groupConfigs(configs, channelConfig)
  }

  async transport(
    message: string,
    options: TelegramDriverOpts = {},
  ): Promise<void> {
    const configs = groupConfigs<TelegramDriverOpts>(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    await new Telegraf(configs.token).telegram.sendMessage(
      configs.chatId,
      Color.removeColors(message),
      {
        parse_mode: configs.parseMode,
      },
    )
  }
}
