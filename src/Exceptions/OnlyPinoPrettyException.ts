/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@secjs/utils'

export class OnlyPinoPrettyException extends Exception {
  public constructor() {
    const content = `The driver "pino" can only be used with "pino-pretty" formatter.`

    super(
      content,
      500,
      'ONLY_PINO-PRETTY_EXCEPTION',
      `Look into your config/logger file the formatter that you are trying to use with your channel configuration.`,
    )
  }
}
