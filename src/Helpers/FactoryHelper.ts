/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Options } from '@athenna/common'

export class FactoryHelper {
  /**
   * Group the configuration values.
   */
  public static groupConfigs(object: any, defaultValue: any): any {
    const formatter = object.formatter || defaultValue.formatter
    const formatterConfig = Options.create(
      object.formatterConfig,
      defaultValue.formatterConfig,
    )

    const driverConfig = Options.create(object, defaultValue)

    return { ...driverConfig, formatter, formatterConfig }
  }
}
