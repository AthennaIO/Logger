/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Log, LoggerProvider } from '#src'
import { Folder, Path } from '@athenna/common'
import { AfterEach, BeforeEach, Test, Timeout } from '@athenna/test'

export default class StackDriverTest {
  @BeforeEach()
  public async beforeEach() {
    await new Folder(Path.stubs('config')).copy(Path.config())
    await Config.safeLoad(Path.config('logging.ts'))

    new LoggerProvider().register()
  }

  @AfterEach()
  public async afterEach() {
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.storage())
  }

  @Test()
  @Timeout(10000)
  public async shouldBeAbleToLogMultiplesChannelsAtOneTime({ assert }) {
    const [[slackReq, discordReq]] = await Log.channel('stack').fatal('hello')

    assert.equal(slackReq.statusCode, 200)
    assert.equal(discordReq.statusCode, 204)
  }
}
