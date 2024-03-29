/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Formatter } from '#src/formatters/Formatter'
import { CliFormatter } from '#src/formatters/CliFormatter'
import { JsonFormatter } from '#src/formatters/JsonFormatter'
import { NoneFormatter } from '#src/formatters/NoneFormatter'
import { SimpleFormatter } from '#src/formatters/SimpleFormatter'
import { MessageFormatter } from '#src/formatters/MessageFormatter'
import { RequestFormatter } from '#src/formatters/RequestFormatter'
import { FormatterExistException } from '#src/exceptions/FormatterExistException'
import { NotFoundFormatterException } from '#src/exceptions/NotFoundFormatterException'

export class FormatterFactory {
  /**
   * Formatters of FormatterFactory.
   */
  public static formatters: Map<string, { Formatter: any }> = new Map()
    .set('cli', { Formatter: CliFormatter })
    .set('json', { Formatter: JsonFormatter })
    .set('none', { Formatter: NoneFormatter })
    .set('simple', { Formatter: SimpleFormatter })
    .set('message', { Formatter: MessageFormatter })
    .set('request', { Formatter: RequestFormatter })

  /**
   * Return an array with all available formatters.
   */
  public static availableFormatters() {
    const availableFormatters: string[] = []

    for (const [key] of this.formatters.entries()) {
      availableFormatters.push(key)
    }

    return availableFormatters
  }

  /**
   * Fabricate a new instance of a formatter.
   */
  public static fabricate(formatterName: string): Formatter {
    const formatterObject = this.formatters.get(formatterName)

    if (!formatterObject) {
      throw new NotFoundFormatterException(formatterName)
    }

    return new formatterObject.Formatter()
  }

  /**
   * Creates a new formatter implementation.
   */
  public static createFormatter(
    name: string,
    formatter: typeof Formatter
  ): void {
    if (this.formatters.has(name)) {
      throw new FormatterExistException(name)
    }

    this.formatters.set(name, { Formatter: formatter })
  }
}
