/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Driver } from '#src/drivers/Driver'
import { context } from '@opentelemetry/api'
import { logs, SeverityNumber } from '@opentelemetry/api-logs'

export class OtelDriver extends Driver {
  public transport(level: string, message: any): void {
    if (!this.couldBeTransported(level)) {
      return
    }

    const logger = logs.getLogger('@athenna/logger')

    logger.emit({
      eventName: 'athenna.log',
      severityNumber: this.getSeverityNumber(level),
      severityText: level.toUpperCase(),
      body: this.getBody(level, message),
      attributes: {
        'athenna.log.level': level,
        'athenna.log.stream': this.getStreamTypeFor(level)
      },
      context: context.active()
    })
  }

  private getBody(level: string, message: any) {
    const formatted = this.format(level, message, true)

    try {
      return JSON.parse(formatted)
    } catch {
      return formatted
    }
  }

  private getSeverityNumber(level: string): SeverityNumber {
    const levels = {
      trace: SeverityNumber.TRACE,
      debug: SeverityNumber.DEBUG,
      info: SeverityNumber.INFO,
      success: SeverityNumber.INFO2,
      warn: SeverityNumber.WARN,
      error: SeverityNumber.ERROR,
      fatal: SeverityNumber.FATAL
    }

    return levels[level] || SeverityNumber.INFO
  }
}
