/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@secjs/utils'

export class DriverAlreadyExistException extends Exception {
  public constructor(driverName: string) {
    const content = `The driver ${driverName} already exists`

    super(
      content,
      500,
      'ALREADY_EXIST_ERROR',
      `The name ${driverName} is already in use. Try using a different name for your driver`,
    )
  }
}
