/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception, Path } from '@athenna/common'
import { DriverFactory } from '#src/factories/DriverFactory'

export class NotFoundDriverException extends Exception {
  public constructor(driverName: string) {
    const availableDrivers = DriverFactory.availableDrivers().join(', ')

    super({
      status: 500,
      code: 'E_NOT_FOUND',
      message: `The driver ${driverName} has not been found.`,
      help: `Available drivers are: ${availableDrivers}. Look into your config/logger.${Path.ext()} file if ${driverName} driver is implemented by logger. Or create ${driverName} driver implementation using DriverFactory.createDriver("${driverName}", ...) method.`,
    })
  }
}
