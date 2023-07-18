/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Formatter } from '#src/formatters/Formatter'

export class SimpleFormatter extends Formatter {
  public format(message: string): string {
    const pid = this.pid()
    const time = this.timestamp()
    const level = this.simpleLevel()
    const colorizedMsg = this.applyColors(message)

    return this.clean(`${level} - ${time} - (${pid}) ${colorizedMsg}`)
  }
}
