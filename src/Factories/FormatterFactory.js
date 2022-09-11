/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { CliFormatter } from '#src/Formatters/CliFormatter'
import { JsonFormatter } from '#src/Formatters/JsonFormatter'
import { NoneFormatter } from '#src/Formatters/NoneFormatter'
import { SimpleFormatter } from '#src/Formatters/SimpleFormatter'
import { MessageFormatter } from '#src/Formatters/MessageFormatter'
import { RequestFormatter } from '#src/Formatters/RequestFormatter'
import { FormatterExistException } from '#src/Exceptions/FormatterExistException'
import { NotFoundFormatterException } from '#src/Exceptions/NotFoundFormatterException'

export class FormatterFactory {
  /**
   * Formatters of FormatterFactory.
   *
   * @type {Map<string, { Formatter: any }>}
   */
  static formatters = new Map()
    .set('cli', { Formatter: CliFormatter })
    .set('json', { Formatter: JsonFormatter })
    .set('none', { Formatter: NoneFormatter })
    .set('simple', { Formatter: SimpleFormatter })
    .set('message', { Formatter: MessageFormatter })
    .set('request', { Formatter: RequestFormatter })

  /**
   * Return an array with all available formatters.
   *
   * @return {any[]}
   */
  static availableFormatters() {
    const availableFormatters = []

    for (const [key] of this.formatters.entries()) {
      availableFormatters.push(key)
    }

    return availableFormatters
  }

  /**
   * Fabricate a new instance of a formatter.
   *
   * @param {string} formatterName
   * @return {any}
   */
  static fabricate(formatterName) {
    const formatterObject = this.formatters.get(formatterName)

    if (!formatterObject) {
      throw new NotFoundFormatterException(formatterName)
    }

    return new formatterObject.Formatter()
  }

  /**
   * Creates a new formatter implementation.
   *
   * @param {string} name
   * @param {() => any} formatter
   */
  static createFormatter(name, formatter) {
    if (this.formatters.has(name)) {
      throw new FormatterExistException(name)
    }

    this.formatters.set(name, { Formatter: formatter })
  }
}
