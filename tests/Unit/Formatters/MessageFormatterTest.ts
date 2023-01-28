/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { hostname } from 'node:os'
import { test } from '@japa/runner'
import { MessageFormatter } from '#src/Formatters/MessageFormatter'

test.group('MessageFormatterTest', () => {
  test('should be able to format logs to message format', async ({ assert }) => {
    const formatter = new MessageFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.isTrue(message.includes('hello'))
    assert.isTrue(message.includes(`(${hostname()})`))
    assert.isTrue(message.includes(`(${process.pid})`))
    assert.isTrue(message.includes(formatter.getEmojiByLevel('info')))
  })
})
