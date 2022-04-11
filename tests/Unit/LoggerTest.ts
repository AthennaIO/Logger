/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Logger } from '../../src/Logger'
import { Config, Folder, Path } from '@secjs/utils'
import { LoggerProvider } from '../../src/Providers/LoggerProvider'
import { Log } from '../../src/Facades/Log'

describe('\n LoggerTest', () => {
  let logger: Logger

  beforeAll(async () => {
    new Folder(Path.tests('Stubs/config')).loadSync().copySync(Path.pwd('config'))

    await new Config().safeLoad(Path.config('logging'))

    logger = new Logger()
  })

  it('should be able to log using default channel', async () => {
    await logger.channel('default').info('Hello from @athenna/logger!', {
      formatterConfig: {
        context: 'InfoContext',
      },
    })
    await logger.channel('default').success('Hello from @athenna/logger!')
    await logger.channel('default').error('Hello from @athenna/logger!')
    await logger.channel('default').warn('Hello from @athenna/logger!')
    await logger.channel('default').debug('Hello from @athenna/logger!')
    await logger.channel('default').log('Hello from @athenna/logger!')

    await logger.channel('default').error('Hello from ({yellow,italic} @athenna/logger!)')
    await logger.channel('default', { formatterConfig: { context: 'Context' } }).success('Hello from @athenna/logger!')
  })

  it('should be able to log using file channel', async () => {
    await logger.channel('file').info('Hello from @athenna/logger!')
    await logger.channel('file').success('Hello from @athenna/logger!')
    await logger.channel('file').error('Hello from @athenna/logger!')
    await logger.channel('file').warn('Hello from @athenna/logger!')
    await logger.channel('file').debug('Hello from @athenna/logger!')
  })

  it('should be able to log using debug channel', async () => {
    await logger.channel('debug').info('Hello from @athenna/logger!')
    await logger.channel('debug').success('Hello from @athenna/logger!')
    await logger.channel('debug').error('Hello from @athenna/logger!')
    await logger.channel('debug').warn('Hello from @athenna/logger!')
    await logger.channel('debug').debug('Hello from @athenna/logger!')
  })

  it('should be able to register the logger as an instance provider and use the Facade', async () => {
    new LoggerProvider().register()

    Log.channel('default', { formatterConfig: { context: 'Facade' } }).warn('Hello from Athenna logger facade!')
    Log.channel('default').warn('Hello from Athenna logger facade!')
  })

  afterAll(() => {
    Folder.safeRemove(Path.storage())
    Folder.safeRemove(Path.pwd('config'))
  })
})
