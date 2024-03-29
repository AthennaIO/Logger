/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, type Context } from '@athenna/test'
import { SimpleFormatter } from '#src/formatters/SimpleFormatter'

export default class SimpleFormatterTest {
  @Test()
  public async shouldBeAbleToFormatLogsToSimpleFormat({ assert }: Context) {
    const formatter = new SimpleFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.isTrue(message.includes('[INFO]'))
    assert.isTrue(message.includes('hello'))
    assert.isTrue(message.includes(`(${process.pid})`))
  }

  @Test()
  public async shouldBeAbleToFormatLogsToSimpleFormatAndForceToCleanTheLogs({ assert }: Context) {
    const formatter = new SimpleFormatter().config({ level: 'info' })
    const message = formatter.clean(formatter.format('hello'), true)

    assert.isFalse(message.includes('\x1B[38;5;51m\x1B[1m'))
  }
}
