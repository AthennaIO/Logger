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

    const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')]

    logs.forEach(log => {
      assert.isFalse(log.includes('TRACE'))
      assert.isTrue(log.includes('hello'))
    })
  }
}
