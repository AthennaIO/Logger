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

      return JSON.stringify(base, this.getCircularReplacer())
    }

    if (Is.Exception(message)) {
      return this.handleExceptionLog(base, message)
    }

    if (Is.Error(message)) {
      return this.handleExceptionLog(base, message.toAthennaException())
    }

    return JSON.stringify({ ...base, ...message }, this.getCircularReplacer())
  }

  private handleExceptionLog(base: any, message: any) {
    return JSON.stringify(
      {
        ...base,
        name: message.name,
        code: message.code,
        msg: message.message,
        help: message.help,
        status: message.status,
        cause: message.cause,
        details: message.details,
        metadata: message.otherInfos,
        stack: message.stack
      },
      this.getCircularReplacer()
    )
  }
}
