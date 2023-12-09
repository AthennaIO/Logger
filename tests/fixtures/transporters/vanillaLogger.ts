/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Logger } from '#src'

const vanillaLogger = new Logger().standalone()

vanillaLogger.trace('hello')
vanillaLogger.debug('%s', 'hello')
vanillaLogger.info('hello')
vanillaLogger.success('%s', 'hello')
vanillaLogger.warn('({yellow,notFound,bold} hello) hello')
vanillaLogger.error('%s', 'hello')
vanillaLogger.fatal('hello')
