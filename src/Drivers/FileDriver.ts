/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'path'
import { Config } from '@secjs/utils'
import { Color } from 'src/Utils/Color'
import { groupConfigs } from 'src/Utils/groupConfigs'
import { DriverContract } from 'src/Contracts/DriverContract'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface FileDriverOpts {
  filePath?: string
  formatter?: any
  formatterConfig?: any
}

export class FileDriver implements DriverContract {
  public configs: Required<FileDriverOpts>

  public constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this.configs = groupConfigs(configs, channelConfig)
  }

  async transport(
    message: string,
    options: FileDriverOpts = {},
  ): Promise<void> {
    const configs = groupConfigs<FileDriverOpts>(options, this.configs)

    const filePath = configs.filePath
    const { dir } = parse(filePath)

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    message = FormatterFactory.fabricate(configs.formatter).format(
      message,
      configs.formatterConfig,
    )

    return new Promise((resolve, reject) => {
      const stream = createWriteStream(filePath, { flags: 'a' })

      stream.write(`${Color.removeColors(message)}` + '\n')

      stream.on('error', reject)
      stream.end(resolve)
    })
  }
}
