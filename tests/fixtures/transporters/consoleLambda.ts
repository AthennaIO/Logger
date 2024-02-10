/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Log, LoggerProvider } from '#src'
import { Folder, Path } from '@athenna/common'

await new Folder(Path.fixtures('config')).copy(Path.config())
await Config.safeLoad(Path.config('logging.ts'))

new LoggerProvider().register()

const simpleLogger = Log.channel('discard', 'lambda')
const noneLogger = Log.config({ formatter: 'none' }).channel('discard', 'lambda')

simpleLogger.trace('hello')
simpleLogger.debug('%s', 'hello')
simpleLogger.info('hello')
noneLogger.success('%s', 'hello')
noneLogger.warn('({yellow,notFound,bold} hello) hello')
noneLogger.error('%s', 'hello')
noneLogger.fatal('hello')

await Folder.safeRemove(Path.config())
await Folder.safeRemove(Path.storage())
