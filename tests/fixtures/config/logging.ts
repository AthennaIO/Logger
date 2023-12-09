/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Env } from '@athenna/config'
import { Color, Path } from '@athenna/common'

export default {
  /*
  |--------------------------------------------------------------------------
  | Default Log Channel
  |--------------------------------------------------------------------------
  |
  | This option defines the default log channel that gets used when writing
  | messages to the logs. The name specified in this option should match
  | one of the channels defined in the "channels" configuration object.
  |
  */

  default: 'application',

  /*
  |--------------------------------------------------------------------------
  | Log Channels
  |--------------------------------------------------------------------------
  |
  | Here you may configure the log channels for your application.
  |
  | Available Drivers:
  |   "console", "discord", "file", "null", "slack", "telegram".
  | Available Formatters:
  |   "cli", "simple", "json", "request", "message", "none".
  |
  */

  channels: {
    stack: {
      driver: 'stack',
      channels: ['slack', 'discord']
    },
    application: {
      driver: 'console',
      formatter: 'simple',
      level: 'debug'
    },
    request: {
      driver: 'console',
      formatter: 'request',
      formatterConfig: {
        asJson: false
      },

      streamType: 'stdout'
    },
    discard: {
      driver: 'null'
    },
    chalk: {
      driver: 'console',
      formatter: 'none',
      formatterConfig: {
        clean: false,
        chalk: Color.dim
      }
    },
    custom: {
      driver: 'custom'
    },
    notFound: {
      driver: 'notFound'
    },
    file: {
      driver: 'file',
      formatter: 'simple',
      formatterConfig: {},

      filePath: Path.logs('athenna.log')
    },
    slack: {
      driver: 'slack',
      formatter: 'message',
      formatterConfig: {},

      url: Env('SLACK_URL')
    },
    discord: {
      driver: 'discord',
      formatter: 'message',
      formatterConfig: {},

      username: 'Athenna',
      url: Env('DISCORD_URL')
    },
    telegram: {
      driver: 'telegram',
      formatter: 'message',
      formatterConfig: {},

      token: Env('TELEGRAM_TOKEN'),
      chatId: Env('TELEGRAM_CHAT_ID'),
      parseMode: 'HTML'
    }
  }
}
