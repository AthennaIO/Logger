import { Config } from '@athenna/config'
import { Folder, Path } from '@athenna/common'

import { Log } from '#src/index'
import { LoggerProvider } from '#src/Providers/LoggerProvider'

await new Folder(Path.stubs('config')).copy(Path.config())
await Config.safeLoad(Path.config('logging.js'))

new LoggerProvider().register()

const simpleLogger = Log.channel('discard', 'application')
const noneLogger = Log.config({ formatter: 'none' }).channel('discard', 'application')

simpleLogger.trace('hello')
simpleLogger.debug('%s', 'hello')
simpleLogger.info('hello')
noneLogger.success('%s', 'hello')
noneLogger.warn('({yellow,notFound,bold} hello) hello')
noneLogger.error('%s', 'hello')
noneLogger.fatal('hello')

await Folder.safeRemove(Path.config())
await Folder.safeRemove(Path.storage())
