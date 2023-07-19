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

export class NullDriver extends Driver {
  public transport() {
    debug('[%s] Ignoring log messages.', NullDriver.name)

    return null
  }
}
