import { Logger } from '#src/index'

const consoleLogger = Logger.getConsoleLogger()

consoleLogger.trace('hello')
consoleLogger.debug('%s', 'hello')
consoleLogger.info('hello')
consoleLogger.success('%s', 'hello')
consoleLogger.warn('({yellow,notFound,bold} hello) hello')
consoleLogger.error('%s', 'hello')
consoleLogger.fatal('hello')
