/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Facade } from '@athenna/ioc'
import { Logger } from '#src/logger/Logger'

export const Log = Facade.createFor<Logger>('Athenna/Core/Logger')
