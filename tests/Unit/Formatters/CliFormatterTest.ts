/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { CliFormatter } from '#src/Formatters/CliFormatter'

test.group('CliFormatterTest', () => {
  test('should be able to format logs to cli format', async ({ assert }) => {
    const formatter = new CliFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.isTrue(message.includes('info'))
    assert.isTrue(message.includes('hello'))
  })
})
