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

import { ColorHelper } from '#src/Helpers/ColorHelper'
import { FactoryHelper } from '#src/Helpers/FactoryHelper'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

export class TelegramDriver {
  /**
   * Holds the configuration set of SlackDriver.
   *
   * @type {{ token?: string, chatId?: string|number, parseMode?: 'HTML'|'Markdown'|'MarkdownV2', formatter?: 'pino-pretty', formatterConfig?: import('pino-pretty').PrettyOptions }}
   */
  configs

  constructor(channel, configs = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = FactoryHelper.groupConfigs(configs, channelConfig)
  }

  /**
   * Transport the log.
   *
   * @param {string} message
   * @param {{ token?: string, chatId?: string|number, parseMode?: 'HTML'|'Markdown'|'MarkdownV2', formatter?: 'pino-pretty', formatterConfig?: import('pino-pretty').PrettyOptions }} [options]
   * @return {Promise<void>}
   */
  async transport(message, options = {}) {
    const configs = FactoryHelper.groupConfigs(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    await new Telegraf(configs.token).telegram.sendMessage(
      configs.chatId,
      ColorHelper.removeColors(message),
      {
        parse_mode: configs.parseMode,
      },
    )
  }
}
