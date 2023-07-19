/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { FormatterFactory } from '#src/factories/FormatterFactory'

export class NotFoundFormatterException extends Exception {
  public constructor(formatterName: string) {
    const availableDrivers = FormatterFactory.availableFormatters().join(', ')

    super({
      status: 500,
      code: 'E_NOT_FOUND',
      message: `The formatter ${formatterName} has not been found.`,
      help: `Available formatters are: ${availableDrivers}. Look into your config/logger file if ${formatterName} formatter is implemented by logger. Or create ${formatterName} formatter implementation using FormatterFactory.createFormatter("${formatterName}", ...) method.`,
    })
  }
}
