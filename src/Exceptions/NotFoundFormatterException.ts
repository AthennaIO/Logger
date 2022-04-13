/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@secjs/utils'

export class NotFoundFormatterException extends Exception {
  public constructor(formatterName: string) {
    const content = `The formatter ${formatterName} has not been found`

    super(
      content,
      500,
      'NOT_FOUND_ERROR',
      `Look into your config/logger file if this formatter is implemented by logger. Or create this formatter implementation using Logger.buildFormatter method`,
    )
  }
}
