/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Formatter, FormatterFactory } from '#src/index'
import { NotFoundFormatterException } from '#src/Exceptions/NotFoundFormatterException'
import { FormatterExistException } from '#src/Exceptions/FormatterExistException'

class CustomFormatter extends Formatter {
  format(message) {
    return `FORMATTED: ${message}`
  }
}

test.group('FormatterFactoryTest', group => {
  test('should be able to list all available formatters', async ({ assert }) => {
    const formatters = FormatterFactory.availableFormatters()

    assert.deepEqual(formatters, ['cli', 'json', 'none', 'simple', 'message', 'request'])
  })

  test('should throw not found formatter exception when trying to fabricate formatter', async ({ assert }) => {
    assert.throws(() => FormatterFactory.fabricate('not-found'), NotFoundFormatterException)
  })

  test('should be able to create custom formatter', async ({ assert }) => {
    FormatterFactory.createFormatter('custom', CustomFormatter)

    const formatter = FormatterFactory.fabricate('custom')

    const message = formatter.format('hello')

    assert.equal(message, 'FORMATTED: hello')
  })

  test('should throw formatter exist exception when trying to create formatter', async ({ assert }) => {
    assert.throws(() => FormatterFactory.createFormatter('cli', CustomFormatter), FormatterExistException)
  })
})
