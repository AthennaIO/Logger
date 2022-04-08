/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Logger } from 'src/Logger'
import { Handler } from 'src/Utils/Handler'

export const Log: Logger = new Proxy({}, new Handler('Athenna/Core/Logger'))
