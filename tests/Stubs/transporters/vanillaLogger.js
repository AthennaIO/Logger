import { Logger } from '#src/index'

// Just testing the drivers behavior without loading configurations.
const vanillaLogger = new Logger().constructor.getVanillaLogger()

vanillaLogger.trace('hello')
vanillaLogger.debug('%s', 'hello')
vanillaLogger.info('hello')
vanillaLogger.success('%s', 'hello')
vanillaLogger.warn('({yellow,notFound,bold} hello) hello')
vanillaLogger.error('%s', 'hello')
vanillaLogger.fatal('hello')
