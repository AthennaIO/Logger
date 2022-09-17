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

test.group('StackDriverTest', group => {
  group.each.setup(async () => {
    await new Folder(Path.stubs('config')).copy(Path.config())
    await new Config().safeLoad(Path.config('logging.js'))

    new LoggerProvider().register()
  })

  group.each.teardown(async () => {
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.storage())
  })

  test('should be able to log multiples channels at one time', async ({ assert }) => {
    const [[slackReq, discordReq]] = await Log.channel('stack').fatal('hello')

    assert.equal(slackReq.status, 200)
    assert.equal(discordReq.status, 204)
  }).timeout(10000)
})
