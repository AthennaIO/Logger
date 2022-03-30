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
}

export class FileDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _filePath: string
  private readonly _formatter: string

  constructor(channel: string, configs: any = {}) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this._level = configs.level || channelConfig.level
    this._context = configs.context || channelConfig.context
    this._filePath = configs.filePath || channelConfig.filePath
    this._formatter = configs.formatter || channelConfig.formatter
  }

  async transport(message: string, options?: FileDriverOpts): Promise<void> {
    options = Object.assign(
      {},
      {
        level: this._level,
        context: this._context,
        filePath: this._filePath,
        formatter: this._formatter,
      },
      options,
    )

    const filePath = options.filePath
    const { dir } = parse(filePath)

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    message = FormatterFactory.fabricate(options.formatter).format(
      message,
      options,
    )

    return new Promise((resolve, reject) => {
      const stream = createWriteStream(filePath, { flags: 'a' })

      stream.write(`${Color.removeColors(message)}` + '\n')

      stream.on('error', reject)
      stream.end(resolve)
    })
  }
}
