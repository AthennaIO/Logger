/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@secjs/utils'
import { DriverFactory } from '#src/Factories/DriverFactory'

export class DriverExistException extends Exception {
  /**
   * Creates a new instance of DriverExistException.
   *
   * @param {string} driverName
   * @return {DriverExistException}
   */
  constructor(driverName) {
    const content = `The driver ${driverName} already exists in DriverFactory.`
    const availableDrivers = DriverFactory.availableDrivers().join(', ')

    super(
      content,
      500,
      'E_EXIST_DRIVER',
      `Available drivers are: ${availableDrivers}. The name ${driverName} is already in use inside DriverFactory. Try using a different name for your driver implementation.`,
    )
  }
}
