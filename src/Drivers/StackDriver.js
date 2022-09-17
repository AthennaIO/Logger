/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Json } from '@secjs/utils'

import { Driver } from '#src/Drivers/Driver'
import { DriverFactory } from '#src/Factories/DriverFactory'

export class StackDriver extends Driver {
  /**
   * Creates a new instance of StackDriver.
   *
   * @param {any} configs
   * @return {StackDriver}
   */
  constructor(configs) {
    super(configs)
  }

  /**
   * Transport the log.
   *
   * @param {string} level
   * @param {any} message
   * @return {any}
   */
  transport(level, message) {
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
