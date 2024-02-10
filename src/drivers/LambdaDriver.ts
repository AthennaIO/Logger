/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { debug } from '#src/debug'
import type { Level } from '#src/types'
import { Driver } from '#src/drivers/Driver'
import { logger } from '#src/helpers/AwsLogger'

export class LambdaDriver extends Driver {
  public transport(level: Level, message: any): any {
    if (!this.couldBeTransported(level)) {
      return
    }

    const levelMap = {
      info: 'info',
      warn: 'warn',
      trace: 'debug',
      debug: 'debug',
      error: 'error',
      success: 'info',
      fatal: 'critical'
    }

    const formatted = this.format(levelMap[level], message)

    debug('[%s] Transporting logs using AWS Powertools.', LambdaDriver.name)

    return logger[levelMap[level]](formatted)
  }
}
