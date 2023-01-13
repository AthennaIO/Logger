/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { runWithId } from 'cls-rtracer'
import { JsonFormatter } from '#src/Formatters/JsonFormatter'
import { Is } from '@athenna/common'

test.group('JsonFormatterTest', group => {
  test('should be able to format logs to json format', async ({ assert }) => {
    const formatter = new JsonFormatter().config({ level: 'info' })

    const message = JSON.parse(formatter.format('hello'))

    assert.equal(message.msg, 'hello')
    assert.equal(message.level, 'info')
    assert.equal(message.pid, process.pid)
    assert.equal(message.traceId, null)
  })

  test('should be able to format logs to json format with the traceId', async ({ assert }) => {
    const formatter = new JsonFormatter().config({ level: 'info' })

    runWithId(() => {
      const message = JSON.parse(formatter.format('hello'))

      assert.equal(message.msg, 'hello')
      assert.equal(message.level, 'info')
      assert.equal(message.pid, process.pid)
      assert.isTrue(Is.Uuid(message.traceId))
    })
  })
})
