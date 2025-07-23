/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { debug } from '#src/debug'
import { Driver } from '#src/drivers/Driver'
import { HttpClient } from '@athenna/common'

export class LokiDriver extends Driver {
  public async transport(level: string, message: any): Promise<any> {
    if (!this.couldBeTransported(level)) {
      return
    }

    const timestamp = Date.now() * 1e6
    const formatted = this.format(level, message, true)

    const body = {
      streams: [
        {
          stream: { job: this.configs.job },
          values: [[timestamp.toString(), formatted]]
        }
      ]
    }

    debug(
      '[%s] Transporting logs with job %s and in url %s.',
      LokiDriver.name,
      this.configs.job,
      this.configs.url
    )

    return HttpClient.builder(true).body(body).post(this.configs.url)
  }
}
