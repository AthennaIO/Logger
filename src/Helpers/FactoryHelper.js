/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Options } from '@secjs/utils'

export class FactoryHelper {
  /**
   * Group the configuration values.
   *
   * @param {any} object
   * @param {any} defaultValue
   * @return {any}
   */
  static groupConfigs(object, defaultValue) {
    const formatter = object.formatter || defaultValue.formatter
    const formatterConfig = Options.create(
      object.formatterConfig,
      defaultValue.formatterConfig,
    )

    const driverConfig = Options.create(object, defaultValue)

    return { ...driverConfig, formatter, formatterConfig }
  }
}
