/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path, Exec } from '@athenna/common'
import { Test, type Context } from '@athenna/test'

export default class ConsoleDriverTest {
  @Test()
  public async shouldBeAbleToLogInConsole({ assert }: Context) {
    const { stdout, stderr } = await Exec.node(Path.fixtures('transporters/console.ts'))

    const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')].filter(
      v => !v.startsWith('(')
    )

    logs.forEach(log => {
      assert.isFalse(log.includes('TRACE'))
      assert.isTrue(log.includes('hello'))
    })
  }
}
