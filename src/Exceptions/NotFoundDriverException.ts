/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@secjs/utils'

export class NotFoundDriverException extends Exception {
  public constructor(driverName: string) {
    const content = `The driver ${driverName} has not been found`

    super(
      content,
      500,
      'NOT_FOUND_ERROR',
      `Look into your config/logger file if this driver is implemented by logger. Or create this driver implementation using Logger.buildDriver method`,
    )
  }
}
