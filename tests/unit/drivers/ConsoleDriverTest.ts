/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test } from '@athenna/test'
import { Path, Exec } from '@athenna/common'
import type { Context } from '@athenna/test/types'

export default class ConsoleDriverTest {
  @Test()
  public async shouldBeAbleToLogInConsole({ assert }: Context) {
    const { stdout, stderr } = await Exec.command(`ts-node --esm ${Path.stubs('transporters/console.ts')}`)

    const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')]

    logs.forEach(log => {
      assert.isFalse(log.includes('TRACE'))
      assert.isTrue(log.includes('hello'))
    })
  }
}
