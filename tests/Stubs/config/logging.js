import { Path } from '@secjs/utils'

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
    application: {
      driver: 'console',
      formatter: 'simple',
      level: 'debug',
    },
    request: {
      driver: 'console',
      formatter: 'request',
      formatterConfig: {
        asJson: false,
      },

      streamType: 'stdout',
    },
    discard: {
      driver: 'null',
    },
    file: {
      driver: 'file',
      formatter: 'simple',
      formatterConfig: {},

      filePath: Path.logs('athenna.log'),
    },
    slack: {
      driver: 'slack',
      formatter: 'message',
      formatterConfig: {},

      url: 'your-slack-webhook-url',
    },
    discord: {
      driver: 'discord',
      formatter: 'message',
      formatterConfig: {},

      username: 'Athenna',
      url: 'your-discord-bot-token',
    },
    telegram: {
      driver: 'telegram',
      formatter: 'message',
      formatterConfig: {},

      token: 'your-telegram-bot-token',
      chatId: '0',
      parseMode: 'HTML',
    },
  },
}
