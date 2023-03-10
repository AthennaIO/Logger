/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test, TestContext } from '@athenna/test'
import { Formatter, FormatterFactory } from '#src'
import { FormatterExistException } from '#src/Exceptions/FormatterExistException'
import { NotFoundFormatterException } from '#src/Exceptions/NotFoundFormatterException'

class CustomFormatter extends Formatter {
  public format(message: string): string {
    return `FORMATTED: ${message}`
  }
}

export default class FormatterFactoryTest {
  @Test()
  public async shouldBeAbleToListAllAvailableFormatters({ assert }: TestContext) {
    const formatters = FormatterFactory.availableFormatters()

    assert.deepEqual(formatters, ['cli', 'json', 'none', 'simple', 'message', 'request'])
  }

  @Test()
  public async shouldThrowNotFoundFormatterExceptionWhenTryingToFabricateFormatter({ assert }: TestContext) {
    assert.throws(() => FormatterFactory.fabricate('not-found'), NotFoundFormatterException)
  }

  @Test()
  public async shouldBeAbleToCreateCustomFormatter({ assert }: TestContext) {
    FormatterFactory.createFormatter('custom', CustomFormatter)

    const formatter = FormatterFactory.fabricate('custom')

    const message = formatter.format('hello')

    assert.equal(message, 'FORMATTED: hello')
  }

  @Test()
  public async shouldThrowFormatterExistExceptionWhenTryingToCreateFormatter({ assert }: TestContext) {
    assert.throws(() => FormatterFactory.createFormatter('cli', CustomFormatter), FormatterExistException)
  }
}
