/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path } from '@athenna/common'
import { Config } from '@athenna/config'
import { Log, LoggerProvider } from '#src'
import type { Context } from '@athenna/test/types'
import { AfterEach, BeforeEach, Test, Timeout } from '@athenna/test'

export default class StackDriverTest {
  @BeforeEach()
  public async beforeEach() {
    await Config.loadAll(Path.stubs('config'))

    new LoggerProvider().register()
  }

  @AfterEach()
  public async afterEach() {
    Config.clear()
  }

  @Test()
  @Timeout(10000)
  public async shouldBeAbleToLogMultiplesChannelsAtOneTime({ assert }: Context) {
    const [[slackReq, discordReq]] = await Log.channel('stack').fatal('hello')

    assert.equal(slackReq.statusCode, 200)
    assert.equal(discordReq.statusCode, 204)
  }
}
