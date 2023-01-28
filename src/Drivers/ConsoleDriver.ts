/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Driver } from '#src/Drivers/Driver'

export class ConsoleDriver extends Driver {
  public transport(level: string, message: any): any {
    if (!this.couldBeTransported(level)) {
      return
    }

    const formatted = this.format(level, message)
    const streamType = this.getStreamTypeFor(level)

    return process[streamType].write(`${formatted}\n`)
  }
}
