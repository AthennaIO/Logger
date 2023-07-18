/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Json } from '@athenna/common'
import { Driver } from '#src/drivers/Driver'
import { DriverFactory } from '#src/factories/DriverFactory'

export class StackDriver extends Driver {
  public transport(level: string, message: any): Promise<any> {
    const configs = Json.copy(this.configs)

    delete configs.driver
    delete configs.channels

    return Promise.all(
      this.driverConfig.channels.map(c =>
        DriverFactory.fabricate(c, configs).transport(level, message),
      ),
    )
  }
}
