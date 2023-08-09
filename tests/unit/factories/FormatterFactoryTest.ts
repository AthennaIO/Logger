/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, type Context } from '@athenna/test'
import { Formatter, FormatterFactory } from '#src'
import { FormatterExistException } from '#src/exceptions/FormatterExistException'
import { NotFoundFormatterException } from '#src/exceptions/NotFoundFormatterException'

class CustomFormatter extends Formatter {
  public format(message: string): string {
    return `FORMATTED: ${message}`
  }
}

export default class FormatterFactoryTest {
  @Test()
  public async shouldBeAbleToListAllAvailableFormatters({ assert }: Context) {
    const formatters = FormatterFactory.availableFormatters()

    assert.deepEqual(formatters, ['cli', 'json', 'none', 'simple', 'message', 'request'])
  }

  @Test()
  public async shouldThrowNotFoundFormatterExceptionWhenTryingToFabricateFormatter({ assert }: Context) {
    assert.throws(() => FormatterFactory.fabricate('not-found'), NotFoundFormatterException)
  }

  @Test()
  public async shouldBeAbleToCreateCustomFormatter({ assert }: Context) {
    FormatterFactory.createFormatter('custom', CustomFormatter)

    const formatter = FormatterFactory.fabricate('custom')

    const message = formatter.format('hello')

    assert.equal(message, 'FORMATTED: hello')
  }

  @Test()
  public async shouldThrowFormatterExistExceptionWhenTryingToCreateFormatter({ assert }: Context) {
    assert.throws(() => FormatterFactory.createFormatter('cli', CustomFormatter), FormatterExistException)
  }
}
