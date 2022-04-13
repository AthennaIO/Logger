/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { DefaultDriverConfigs } from 'src/Contracts/DefaultDriverConfigs'

export interface DriverContract {
  configs?: DefaultDriverConfigs | any

  transport(message: string, options?: any): void | Promise<void>
}
