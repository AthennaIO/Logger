/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test } from '@athenna/test'
import type { Context } from '@athenna/test/types'
import { CliFormatter } from '#src/formatters/CliFormatter'

export default class CliFormatterTest {
  @Test()
  public shouldBeAbleToFormatLogsToCliFormat({ assert }: Context) {
    const formatter = new CliFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.isTrue(message.includes('info'))
    assert.isTrue(message.includes('hello'))
  }
}
