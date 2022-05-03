/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pino from 'pino'

import { Config } from '@secjs/utils'

import { FactoryHelper } from '#src/index'
import { OnlyPinoPrettyException } from '#src/Exceptions/OnlyPinoPrettyException'

export class PinoDriver {
  /**
   * Holds the configuration set of PinoDriver.
   *
   * @type {import('pino').LoggerOptions & { formatter?: 'pino-pretty', formatterConfig?: import('pino-pretty').PrettyOptions }}
   */
  configs

  /**
   * Creates a new instance of PinoDriver.
   *
   * @param {string} channel
   * @param {any} [configs]
   * @return {PinoDriver}
   */
  constructor(channel, configs = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = FactoryHelper.groupConfigs(configs, channelConfig)
  }

  /**
   * Transport the log.
   *
   * @param {string} message
   * @param {import('pino').LoggerOptions & { formatter?: 'pino-pretty', formatterConfig?: import('pino-pretty').PrettyOptions }} [options]
   * @return {void}
   */
  transport(message, options = {}) {
    const configs = FactoryHelper.groupConfigs(options, this.configs)

    configs.customLevels = {
      info: 1,
      warn: 2,
      error: 3,
      debug: 4,
      success: 5,
      critical: 6,
    }
    configs.useOnlyCustomLevels = true

    const pinoMethod = configs.formatterConfig.level.toLowerCase()

    delete configs.formatterConfig.level
    delete configs.formatterConfig.chalk

    if (configs.formatter !== 'pino-pretty') {
      throw new OnlyPinoPrettyException()
    }

    const pinoConfigs = {}

    Object.keys(configs).forEach(key => {
      if (key === 'formatter') {
        pinoConfigs.transport = {
          target: 'pino-pretty',
          options: configs.formatterConfig,
        }
        configs.formatterConfig.customLevels =
          'info:1,warn:2,error:3,debug:4,success:5,critical:6'
        configs.formatterConfig.customColors =
          'info:cyan,warn:yellow,error:red,debug:magenta,success:green,critical:red'

        return
      }

      if (['driver', 'formatterConfig'].includes(key)) {
        return
      }

      pinoConfigs[key] = configs[key]
    })

    const logger = pino(pinoConfigs)

    logger[pinoMethod](message)
  }
}
