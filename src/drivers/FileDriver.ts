/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { File } from '@athenna/common'
import { Driver } from '#src/drivers/Driver'
import { debug } from '#src/debug'

export class FileDriver extends Driver {
  public async transport(level: string, message: any): Promise<any> {
    if (!this.couldBeTransported(level)) {
      return
    }

    const filePath = this.driverConfig.filePath
    const formatted = this.format(level, message, true)
    const buffer = Buffer.from(`${formatted}\n`, 'utf-8')

    debug('[%s] Transporting logs in %s file path.', FileDriver.name, filePath)

    if (await File.exists(filePath)) {
      debug(
        '[%s] File already exist, appending the data to it.',
        FileDriver.name
      )

      return new File(filePath).append(buffer)
    }

    return new File(filePath, buffer).load()
  }
}
