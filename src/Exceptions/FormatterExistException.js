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

export class FormatterExistException extends Exception {
  /**
   * Creates a new instance of FormatterExistException.
   *
   * @param {string} formatterName
   * @return {FormatterExistException}
   */
  constructor(formatterName) {
    const content = `The formatter ${formatterName} already exists in FormatterFactory.`
    const availableFormatters =
      FormatterFactory.availableFormatters().join(', ')

    super(
      content,
      500,
      'E_EXIST_FORMATTER',
      `Available formatters are: ${availableFormatters}. The name ${formatterName} is already in use inside FormatterFactory. Try using a different name for your formatter implementation.`,
    )
  }
}
