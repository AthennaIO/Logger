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

export interface RequestFormatterOptions {
  chalk: Chalk
  asJson: boolean
}

export class RequestFormatter implements FormatterContract {
  format(ctx: any, options: RequestFormatterOptions): string {
    const ip = ctx.request.ip
    const status = ctx.status
    const baseUrl = ctx.request.baseUrl
    const method = Color[ctx.request.method]
    const responseTimeMs = `${ctx.responseTime}ms`

    if (!options.asJson) {
      return `(${ip}) - [${status}] ${method}::${baseUrl} ${responseTimeMs}`
    }

    const metadata = {
      method: ctx.request.method,
      duration: responseTimeMs,
      status: status <= 399 ? 'SUCCESS' : 'ERROR',
      statusCode: status,
      url: ctx.request.hostUrl,
      path: ctx.request.baseUrl,
      createdAt: Date.now(),
    }

    return JSON.stringify({
      request: JSON.stringify(ctx.request),
      response: JSON.stringify(ctx.response),
      metadata,
    })
  }
}
