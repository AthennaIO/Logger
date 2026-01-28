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
import { HttpClient, Is } from '@athenna/common'

export class SlackDriver extends Driver {
  public async transport(level: string, message: any): Promise<any> {
    if (!this.couldBeTransported(level)) {
      return
    }

    const formatted = this.format(level, message, true)

    debug(
      '[%s] Transporting logs in url %s.',
      SlackDriver.name,
      this.configs.url
    )

    if (Is.Object(formatted) && formatted.text && formatted.blocks) {
      return HttpClient.builder(true).post(this.configs.url, {
        body: { text: formatted.text, blocks: formatted.blocks }
      })
    }

    return HttpClient.builder(true).post(this.configs.url, {
      body: { text: formatted }
    })
  }
}
