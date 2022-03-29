/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { existsSync } from 'fs'
import { Logger } from '../../src/Logger'
import { Folder, Path } from '@secjs/utils'

describe('\n LoggerTest', () => {
  let logger: Logger

  beforeAll(() => {
    new Folder(Path.tests('Stubs/config')).loadSync().copySync(Path.pwd('config'))

    logger = new Logger()
  })

  it('should be able to log using default channel', async () => {
    await logger.channel('default').info('Hello from @athenna/logger!')
    await logger.channel('default').success('Hello from @athenna/logger!')
    await logger.channel('default').error('Hello from @athenna/logger!')
    await logger.channel('default').warn('Hello from @athenna/logger!')
    await logger.channel('default').debug('Hello from @athenna/logger!')
  })

  it('should be able to log using file channel', async () => {
    await logger.channel('file').info('Hello from @athenna/logger!')
    await logger.channel('file').success('Hello from @athenna/logger!')
    await logger.channel('file').error('Hello from @athenna/logger!')
    await logger.channel('file').warn('Hello from @athenna/logger!')
    await logger.channel('file').debug('Hello from @athenna/logger!')

    expect(existsSync(Path.logs('athenna.log'))).toBeTruthy()
  })

  it('should be able to log using debug channel', async () => {
    await logger.channel('debug').info('Hello from @athenna/logger!')
    await logger.channel('debug').success('Hello from @athenna/logger!')
    await logger.channel('debug').error('Hello from @athenna/logger!')
    await logger.channel('debug').warn('Hello from @athenna/logger!')
    await logger.channel('debug').debug('Hello from @athenna/logger!')
  })

  afterAll(() => {
    Folder.safeRemove(Path.storage())
    Folder.safeRemove(Path.pwd('config'))
  })
})
