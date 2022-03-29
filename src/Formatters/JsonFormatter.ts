/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Chalk } from 'chalk'
import { Color } from 'src/Utils/Color'
import { FormatterContract } from 'src/Contracts/FormatterContract'

export interface JsonFormatterOptions {
  color: Chalk
}

export class JsonFormatter implements FormatterContract {
  format(
    message: Record<any, unknown>,
    options?: JsonFormatterOptions,
  ): string {
    options = Object.assign({}, { color: Color.green }, options)

    const pid = Color.yellow(`[Athenna] - PID: ${process.pid}`)

    return `${pid} - ${Color.bold('JSON:')} ${options.color(
      JSON.stringify(message),
    )}`
  }
}
