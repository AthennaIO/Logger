/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Is } from '@secjs/utils'
import { Formatter } from '#src/Formatters/Formatter'

export class JsonFormatter extends Formatter {
  /**
   * Format the message.
   *
   * @param {any} message
   * @return {string}
   */
  format(message) {
    const base = {
      level: this.configs.level,
      time: Date.now(),
      pid: this.pid(),
      hostname: this.hostname(),
    }

    if (Is.String(message)) {
      base.msg = message

      return JSON.stringify(base)
    }

    return JSON.stringify({ ...base, ...message })
  }
}
