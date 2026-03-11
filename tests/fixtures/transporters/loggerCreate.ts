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

const logger = Log.create({ namespace: 'UserService' }).config({ formatter: 'json' }).channel('application')

logger.error('failed to retrieve user')

await Folder.safeRemove(Path.config())
await Folder.safeRemove(Path.storage())
