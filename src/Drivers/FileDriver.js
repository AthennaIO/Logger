/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { File } from '@secjs/utils'

import { Driver } from '#src/Drivers/Driver'

export class FileDriver extends Driver {
  /**
   * Creates a new instance of FileDriver.
   *
   * @param {any} configs
   * @return {FileDriver}
   */
  constructor(configs) {
    super(configs)
  }

  /**
   * Transport the log.
   *
   * @param {string} level
   * @param {string} message
   * @return {Promise<any>}
   */
  async transport(level, message) {
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
