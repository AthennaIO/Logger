/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { parse } from 'path'
import { Color } from 'src/Utils/Color'
import { Path, Config } from '@secjs/utils'
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

  constructor(channel: string) {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    this._level = channelConfig.level || 'INFO'
    this._context = channelConfig.context || 'FileDriver'
    this._filePath = channelConfig.filePath || Path.noBuild().logs('secjs.log')
    this._formatter = channelConfig.formatter || 'log'
  }

  async transport(message: string, options?: FileDriverOpts): Promise<void> {
    options = Object.assign(
      {},
      { level: this._level, context: this._context, filePath: this._filePath },
      options,
    )

    const filePath = options.filePath
    const { dir } = parse(filePath)

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    message = FormatterFactory.fabricate(this._formatter).format(
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
