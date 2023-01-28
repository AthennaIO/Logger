/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@athenna/common'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

export class FormatterExistException extends Exception {
  public constructor(formatterName: string) {
    const availableFormatters =
      FormatterFactory.availableFormatters().join(', ')

    super({
      status: 500,
      code: 'E_EXIST_FORMATTER',
      message: `The formatter ${formatterName} already exists in FormatterFactory.`,
      help: `Available formatters are: ${availableFormatters}. The name ${formatterName} is already in use inside FormatterFactory. Try using a different name for your formatter implementation.`,
    })
  }
}
