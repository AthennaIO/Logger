/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Formatter } from '#src/Formatters/Formatter'

export class CliFormatter extends Formatter {
  public format(message: string): string {
    const level = this.cliLevel()

    return this.clean(`${level} ${this.toString(message)}`)
  }
}
