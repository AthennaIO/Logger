/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Facade } from '@athenna/ioc'

/**
 * Log facade.
 *
 * @type {Facade & import('#src/index').Logger}
 */
export const Log = Facade.createFor('Athenna/Core/Logger')
