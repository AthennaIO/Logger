/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Config, Folder, Path } from '@secjs/utils'

import { Log } from '#src/index'
import { LoggerProvider } from '#src/Providers/LoggerProvider'

test.group('LogTest', group => {
  group.setup(async () => {
    await new Folder(Path.stubs('config')).copy(Path.config())

    await new Config().safeLoad(Path.config('logging.js'))

    new LoggerProvider().register()
  })

  group.teardown(async () => {
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.storage())
  })

  test('should be able to log using default/application channel', async () => {
    const log = Log.channel('default')
    const message = 'Hello from @athenna/logger'

    log.info(message)
    log.warn(message)
    log.error(message)
    log.debug(message)
    log.success(message)
    log.critical(message)
  })

  test('should be able to log using request channel', async () => {
    const log = Log.channel('request')
    const ctx = {
      status: 200,
      responseTime: 1,
      body: {
        hello: 'world',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      request: {
        ip: '127.0.0.1',
        method: 'GET',
        hostUrl: 'http://localhost:1335',
        baseUrl: 'http://localhost:1335/:id',
        params: {
          id: 1,
        },
        queries: {},
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }

    log.info(ctx)
    log.warn(ctx)
    log.error(ctx)
    log.debug(ctx)
    log.success(ctx)
    log.critical(ctx)
  })

  test('should be able to log using pino channel', async () => {
    const log = Log.channel('pino')
    const message = 'Hello from @athenna/logger'

    log.info(message)
    log.warn(message)
    log.error(message)
    log.debug(message)
    log.success(message)
    log.critical(message)
  })

  test('should be able to log using debug channel', async () => {
    const log = Log.channel('debug')
    const message = 'Hello from @athenna/logger'

    log.info(message)
    log.warn(message)
    log.error(message)
    log.debug(message)
    log.success(message)
    log.critical(message)
  })

  test('should be able to discard the log using discard channel', async () => {
    const log = Log.channel('discard')
    const message = 'Hello from @athenna/logger'

    log.info(message)
    log.warn(message)
    log.error(message)
    log.debug(message)
    log.success(message)
    log.critical(message)
  })

  test('should be able to log using file channel', async () => {
    const log = Log.channel('file')
    const message = 'Hello from @athenna/logger'

    await log.info(message)
    await log.warn(message)
    await log.error(message)
    await log.debug(message)
    await log.success(message)
    await log.critical(message)
  })
})
