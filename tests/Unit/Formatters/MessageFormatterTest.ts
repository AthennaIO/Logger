/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { hostname } from 'node:os'
import { Test, TestContext } from '@athenna/test'
import { MessageFormatter } from '#src/Formatters/MessageFormatter'

export default class MessageFormatterTest {
  @Test()
  public async shouldBeAbleToFormatLogsToMessageFormat({ assert }: TestContext) {
    const formatter = new MessageFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.isTrue(message.includes('hello'))
    assert.isTrue(message.includes(`(${hostname()})`))
    assert.isTrue(message.includes(`(${process.pid})`))
    assert.isTrue(message.includes(formatter.getEmojiByLevel('info')))
  }
}
