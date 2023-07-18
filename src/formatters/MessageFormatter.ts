/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Formatter } from '#src/formatters/Formatter'

export class MessageFormatter extends Formatter {
  public format(message: string): string {
    return this.clean(
      `${this.messageLevel()} - (${this.pid()}) - (${this.hostname()}): ${this.toString(
        message,
      )}`,
    )
  }
}
