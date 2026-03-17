/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exec, Path } from '@athenna/common'
import { Test, type Context } from '@athenna/test'

export default class LoggerTest {
  @Test()
  public async shouldBeAbleToLogInConsoleUsingVanillaLogger({ assert }: Context) {
    const { stdout, stderr } = await Exec.node(Path.fixtures('transporters/vanillaLogger.ts'))

    const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')].filter(
      v => !v.startsWith('(')
    )

    logs.forEach(log => {
      assert.isFalse(log.includes('TRACE'))
      assert.isTrue(log.includes('hello'))
    })
  }

  @Test()
  public async shouldBeAbleToCreateLoggerWithDefaultMessageContent({ assert }: Context) {
    const { stdout, stderr } = await Exec.node(Path.fixtures('transporters/loggerCreate.ts'))

    const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')].filter(
      v => !v.startsWith('(')
    )
    const message = JSON.parse(logs[0])

    assert.equal(message.msg, 'failed to retrieve user')
    assert.equal(message.level, 'error')
    assert.equal(message.namespace, 'UserService')
  }

  @Test()
  public async shouldBeAbleToReapplyDriversWhenConfigIsCalledAfterChannel({ assert }: Context) {
    const { stdout, stderr } = await Exec.node(Path.fixtures('transporters/loggerChannelConfig.ts'))

    const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')].filter(
      v => !v.startsWith('(')
    )
    const message = JSON.parse(logs[0])

    assert.equal(message.msg, 'failed to retrieve user')
    assert.equal(message.level, 'error')
    assert.equal(message.namespace, 'UserService')
  }
}
