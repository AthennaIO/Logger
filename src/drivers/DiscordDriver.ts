/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { HttpClient } from '@athenna/common'
import { Driver } from '#src/drivers/Driver'

export class DiscordDriver extends Driver {
  public async transport(level: string, message: any): Promise<any> {
    if (!this.couldBeTransported(level)) {
      return
    }

    const formatted = this.format(level, message, true)

    return HttpClient.builder(true).post(this.configs.url, {
      username: this.configs.username,
      content: formatted,
    })
  }
}
