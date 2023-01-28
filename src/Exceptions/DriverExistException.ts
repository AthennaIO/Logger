/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { DriverFactory } from '#src/Factories/DriverFactory'

export class DriverExistException extends Exception {
  public constructor(driverName: string) {
    const availableDrivers = DriverFactory.availableDrivers().join(', ')

    super({
      status: 500,
      code: 'E_EXIST_DRIVER',
      message: `The driver ${driverName} already exists in DriverFactory.`,
      help: `Available drivers are: ${availableDrivers}. The name ${driverName} is already in use inside DriverFactory. Try using a different name for your driver implementation.`,
    })
  }
}
