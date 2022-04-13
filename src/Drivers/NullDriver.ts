/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { DriverContract } from 'src/Contracts/DriverContract'

export class NullDriver implements DriverContract {
  public constructor(_channel: string, _configs: any = {}) {}

  transport(_message: string, _options?: any): void {}
}
