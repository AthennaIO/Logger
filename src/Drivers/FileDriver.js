/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config, File } from '@secjs/utils'
import { ColorHelper } from '#src/Helpers/ColorHelper'
import { FactoryHelper } from '#src/Helpers/FactoryHelper'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

export class FileDriver {
  /**
   * Holds the configuration set of FileDriver.
   *
   * @type {{ filePath?: string, formatter?: any, formatterConfig?: any }}
   */
  configs

  /**
   * Creates a new instance of FileDriver.
   *
   * @param {string} channel
   * @param {any} [configs]
   * @return {FileDriver}
   */
  constructor(channel, configs = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = FactoryHelper.groupConfigs(configs, channelConfig)
  }

  /**
   * Transport the log.
   *
   * @param {string} message
   * @param {{ filePath?: string, formatter?: any, formatterConfig?: any }} [options]
   * @return {Promise<void>}
   */
  async transport(message, options = {}) {
    const configs = FactoryHelper.groupConfigs(options, this.configs)

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    const messageBuffer = Buffer.from(`${ColorHelper.removeColors(message)}\n`)

    const file = new File(configs.filePath, messageBuffer)
    const fileExists = await File.exists(configs.filePath)

    if (!fileExists) {
      return file.load()
    }

    return file.append(messageBuffer)
  }
}
