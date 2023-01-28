/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Config } from '@athenna/config'
import { Log, LoggerProvider } from '#src'
import { Folder, Path } from '@athenna/common'

test.group('SlackDriverTest', group => {
  group.each.setup(async () => {
    await new Folder(Path.stubs('config')).copy(Path.config())
    await Config.safeLoad(Path.config('logging.ts'))

    new LoggerProvider().register()
  })

  group.each.teardown(async () => {
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.storage())
  })

  test('should be able to log in slack', async ({ assert }) => {
    const log = Log.config({ level: 'success' }).channel('slack')

    const message = 'hello'

    const [traceRes] = await log.trace(message)
    const [debugRes] = await log.debug(message)
    const [infoRes] = await log.info(message)
    const [successRes] = await log.success({ hello: 'world!' })
    const [warnRes] = await log.warn(message)
    const [errorRes] = await log.error({ hello: 'world!' })
    const [fatalRes] = await log.fatal(message)

    assert.isUndefined(traceRes)
    assert.isUndefined(debugRes)
    assert.isUndefined(infoRes)

    assert.equal(successRes.statusCode, 200)
    assert.equal(warnRes.statusCode, 200)
    assert.equal(errorRes.statusCode, 200)
    assert.equal(fatalRes.statusCode, 200)
  }).timeout(10000)
})
