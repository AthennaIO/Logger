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
  /**
   * Creates a new instance of OnlyPinoPrettyException.
   *
   * @return {OnlyPinoPrettyException}
   */
  constructor() {
    const content = `The driver "pino" can only be used with "pino-pretty" formatter.`

    super(
      content,
      500,
      'E_PINO_PRETTY',
      `Available formatters are: pino-pretty. Look into your config/logger file where your are using "pino" driver and change the formatter to pino-pretty.`,
    )
  }
}
