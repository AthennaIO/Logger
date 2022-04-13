/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pino from 'pino'
import pinoPretty from 'pino-pretty'

import { Config } from '@secjs/utils'
import { groupConfigs } from 'src/Utils/groupConfigs'
import { DriverContract } from 'src/Contracts/DriverContract'
import { OnlyPinoPrettyException } from 'src/Exceptions/OnlyPinoPrettyException'

export interface PinoDriverOpts extends pino.LoggerOptions {
  formatter: 'pino-pretty'
  formatterConfig: pinoPretty.PrettyOptions
}

export class PinoDriver implements DriverContract {
  public configs: PinoDriverOpts

  public constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = groupConfigs(configs, channelConfig)
  }

  transport(message: any, options: Partial<PinoDriverOpts> = {}): void {
    const configs: PinoDriverOpts = groupConfigs(options, this.configs)

    configs.customLevels = {
      info: 1,
      warn: 2,
      error: 3,
      debug: 4,
      success: 5,
    }
    configs.useOnlyCustomLevels = true

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const pinoMethod = configs.formatterConfig.level.toLowerCase()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete configs.formatterConfig.level
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete configs.formatterConfig.chalk

    if (configs.formatter !== 'pino-pretty') {
      throw new OnlyPinoPrettyException()
    }

    const pinoConfigs: any = {}

    Object.keys(configs).forEach(key => {
      if (key === 'formatter') {
        pinoConfigs.transport = {
          target: 'pino-pretty',
          options: configs.formatterConfig,
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        configs.formatterConfig.customLevels =
          'info:1,warn:2,error:3,debug:4,success:5'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        configs.formatterConfig.customColors =
          'info:cyan,warn:yellow,error:red,debug:magenta,success:green'

        return
      }

      if (['driver', 'formatterConfig'].includes(key)) {
        return
      }

      pinoConfigs[key] = configs[key]
    })

    const logger = pino(pinoConfigs)

    return logger[pinoMethod](message)
  }
}
