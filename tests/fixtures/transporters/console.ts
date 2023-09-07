import { Config } from '@athenna/config'
import { Log, LoggerProvider } from '#src'
import { Folder, Path } from '@athenna/common'

await new Folder(Path.fixtures('config')).copy(Path.config())
await Config.safeLoad(Path.config('logging.ts'))

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