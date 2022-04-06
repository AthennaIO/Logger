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
import { DriverContract } from 'src/Contracts/DriverContract'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export interface FileDriverOpts {
  level: string
  context: string
  formatter: string
  filePath: string
  formatterConfig: any
}

export class FileDriver implements DriverContract {
  private readonly _filePath: string
  private readonly _formatter: string
  private readonly _formatterConfig: any

  constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this._filePath = configs.filePath || channelConfig.filePath
    this._formatter = configs.formatter || channelConfig.formatter
    this._formatterConfig = Object.assign(
      {},
      channelConfig.formatterConfig,
      configs.formatterConfig,
    )
  }

  async transport(message: string, options?: FileDriverOpts): Promise<void> {
    options = Object.assign(
      {},
      {
        filePath: this._filePath,
        formatter: this._formatter,
      },
      options,
    ) as FileDriverOpts

    const filePath = options.filePath
    const { dir } = parse(filePath)

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    const formatterOptions = Object.assign(
      {},
      this._formatterConfig,
      options.formatterConfig,
    )

    message = FormatterFactory.fabricate(options.formatter).format(
      message,
      formatterOptions,
    )

    return new Promise((resolve, reject) => {
      const stream = createWriteStream(filePath, { flags: 'a' })

      stream.write(`${Color.removeColors(message)}` + '\n')

      stream.on('error', reject)
      stream.end(resolve)
    })
  }
}
