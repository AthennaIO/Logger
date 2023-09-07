/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Is } from '@athenna/common'
import { Formatter } from '#src/formatters/Formatter'

export class JsonFormatter extends Formatter {
  public format(message: any): string {
    const base: any = {
      level: this.level(),
      time: Date.now(),
      pid: this.pid(),
      hostname: this.hostname(),
      traceId: this.traceId()
    }

    if (Is.String(message)) {
      base.msg = message

      return JSON.stringify(base)
    }

    return JSON.stringify({ ...base, ...message })
  }
}
