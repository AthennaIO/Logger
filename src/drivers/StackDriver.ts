/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { debug } from '#src/debug'
import { Json } from '@athenna/common'
import { Driver } from '#src/drivers/Driver'
import { DriverFactory } from '#src/factories/DriverFactory'

export class StackDriver extends Driver {
  public transport(level: string, message: any): Promise<any> {
    const configs = Json.copy(this.configs)

    delete configs.driver
    delete configs.channels

    debug(
      '[%s] Transporting logs in channels: %s.',
      StackDriver.name,
      this.driverConfig.channels.join(', ')
    )

    const promises = this.driverConfig.channels.map(channel => {
      const channelConfig = configs?.[channel]

      return DriverFactory.fabricate(channel, channelConfig).transport(
        level,
        message
      )
    })

    return Promise.all(promises)
  }
}
