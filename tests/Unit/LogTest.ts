/**
 * @athenna/template
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Log } from '../../src/Log'
import { Folder, Path } from '@secjs/utils'

describe('\n LogTest', () => {
  beforeAll(() => {
    new Folder(Path.tests('Stubs/config')).loadSync().copySync(Path.pwd('config'))
  })

  it('should be able to log using default channel', async () => {
    Log.channel('default').info('Hello from @athenna/logger!')
    Log.channel('default').success('Hello from @athenna/logger!')
    Log.channel('default').error('Hello from @athenna/logger!')
    Log.channel('default').warn('Hello from @athenna/logger!')
    Log.channel('default').debug('Hello from @athenna/logger!')
  })

  it('should be able to log using file channel', async () => {
    Log.channel('file').info('Hello from @athenna/logger!')
    Log.channel('file').success('Hello from @athenna/logger!')
    Log.channel('file').error('Hello from @athenna/logger!')
    Log.channel('file').warn('Hello from @athenna/logger!')
    Log.channel('file').debug('Hello from @athenna/logger!')
  })

  it('should be able to log using debug channel', async () => {
    Log.channel('debug').info('Hello from @athenna/logger!')
    Log.channel('debug').success('Hello from @athenna/logger!')
    Log.channel('debug').error('Hello from @athenna/logger!')
    Log.channel('debug').warn('Hello from @athenna/logger!')
    Log.channel('debug').debug('Hello from @athenna/logger!')
  })

  afterAll(() => {
    Folder.safeRemove(Path.storage())
    Folder.safeRemove(Path.pwd('config'))
  })
})
