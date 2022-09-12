/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { JsonFormatter } from '#src/Formatters/JsonFormatter'

test.group('JsonFormatterTest', group => {
  test('should be able to format logs to json format', async ({ assert }) => {
    const formatter = new JsonFormatter().config({ level: 'info' })

    const message = JSON.parse(formatter.format('hello'))

    assert.equal(message.msg, 'hello')
    assert.equal(message.level, 'info')
    assert.equal(message.pid, process.pid)
  })
})
