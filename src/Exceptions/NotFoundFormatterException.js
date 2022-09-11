/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@secjs/utils'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

export class NotFoundFormatterException extends Exception {
  /**
   * Creates a new instance of NotFoundFormatterException.
   *
   * @param {string} formatterName
   * @return {NotFoundFormatterException}
   */
  constructor(formatterName) {
    const content = `The formatter ${formatterName} has not been found.`
    const availableDrivers = FormatterFactory.availableFormatters().join(', ')

    super(
      content,
      500,
      'E_NOT_FOUND',
      `Available formatters are: ${availableDrivers}. Look into your config/logger.js file if ${formatterName} formatter is implemented by logger. Or create ${formatterName} formatter implementation using FormatterFactory.createFormatter("${formatterName}", ...) method.`,
    )
  }
}
