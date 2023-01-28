/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { NoneFormatter } from '#src/Formatters/NoneFormatter'

test.group('NoneFormatterTest', () => {
  test('should be able to format logs to none format', async ({ assert }) => {
    const formatter = new NoneFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.equal(message, 'hello')
  })
})
