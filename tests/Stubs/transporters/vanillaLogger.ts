import { Logger } from '#src'

const vanillaLogger = Logger.getVanillaLogger()

vanillaLogger.trace('hello')
vanillaLogger.debug('%s', 'hello')
vanillaLogger.info('hello')
vanillaLogger.success('%s', 'hello')
vanillaLogger.warn('({yellow,notFound,bold} hello) hello')
vanillaLogger.error('%s', 'hello')
vanillaLogger.fatal('hello')
