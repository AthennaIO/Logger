/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { LogFormatter } from 'src/Formatters/LogFormatter'
import { JsonFormatter } from 'src/Formatters/JsonFormatter'
import { DebugFormatter } from 'src/Formatters/DebugFormatter'
import { ContextFormatter } from 'src/Formatters/ContextFormatter'
import { FormatterContract } from 'src/Contracts/FormatterContract'
import { NotFoundFormatterException } from 'src/Exceptions/NotFoundFormatterException'
import { FormatterAlreadyExistException } from 'src/Exceptions/FormatterAlreadyExistException'

export interface FormatterObject {
  Formatter: any
}

export class FormatterFactory {
  private static formatters: Map<
    string,
    FormatterObject
  > = new Map()
    .set('context', { Formatter: ContextFormatter })
    .set('debug', { Formatter: DebugFormatter })
    .set('json', { Formatter: JsonFormatter })
    .set('log', { Formatter: LogFormatter })

  static availableFormatters(): string[] {
    const availableFormatters: string[] = []

    for (const [key] of this.formatters.entries()) {
      availableFormatters.push(key)
    }

    return availableFormatters
  }

  static fabricate(formatterName: string): FormatterContract {
    const formatterObject = this.formatters.get(formatterName)

    if (!formatterObject) {
      throw new NotFoundFormatterException(formatterName)
    }

    return new formatterObject.Formatter()
  }

  static createFormatter(name: string, driver: new () => FormatterContract) {
    if (this.formatters.has(name)) {
      throw new FormatterAlreadyExistException(name)
    }

    this.formatters.set(name, { Formatter: driver })
  }
}
