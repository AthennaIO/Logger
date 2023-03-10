/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, TestContext } from '@athenna/test'
import { CliFormatter } from '#src/Formatters/CliFormatter'

export default class CliFormatterTest {
  @Test()
  public shouldBeAbleToFormatLogsToCliFormat({ assert }: TestContext) {
    const formatter = new CliFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.isTrue(message.includes('info'))
    assert.isTrue(message.includes('hello'))
  }
}
