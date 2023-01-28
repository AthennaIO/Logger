/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { SimpleFormatter } from '#src/Formatters/SimpleFormatter'

test.group('SimpleFormatterTest', () => {
  test('should be able to format logs to simple format', async ({ assert }) => {
    const formatter = new SimpleFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.isTrue(message.includes('[INFO]'))
    assert.isTrue(message.includes('hello'))
    assert.isTrue(message.includes(`(${process.pid})`))
  })

  test('should be able to format logs to simple format and force to clean the logs', async ({ assert }) => {
    const formatter = new SimpleFormatter().config({ level: 'info' })
    const message = formatter.clean(formatter.format('hello'), true)

    assert.isFalse(message.includes('\x1B[38;5;51m\x1B[1m'))
  })
})
