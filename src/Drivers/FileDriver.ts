/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { File } from '@athenna/common'
import { Driver } from '#src/Drivers/Driver'

export class FileDriver extends Driver {
  public async transport(level: string, message: any): Promise<any> {
    if (!this.couldBeTransported(level)) {
      return
    }

    const filePath = this.driverConfig.filePath
    const formatted = this.format(level, message, true)
    const buffer = Buffer.from(`${formatted}\n`, 'utf-8')

    if (await File.exists(filePath)) {
      return new File(filePath).append(buffer)
    }

    return new File(filePath, buffer).load()
  }
}
