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

export default class LambdaDriverTest {
  @Test()
  public async shouldBeAbleToLogInConsoleWithLambdaLib({ assert }: Context) {
    const { stdout, stderr } = await Exec.node(Path.fixtures('transporters/consoleLambda.ts'))

    const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')].filter(
      v => !v.startsWith('(')
    )

    logs.forEach(log => {
      assert.isFalse(log.includes('DEBUG'))
      assert.isTrue(log.includes('hello'))
    })
  }
}
