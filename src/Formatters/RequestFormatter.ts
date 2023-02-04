/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color, Is } from '@athenna/common'
import { Formatter } from '#src/Formatters/Formatter'

export class RequestFormatter extends Formatter {
  public format(ctx: any): string {
    if (Is.String(ctx)) {
      return ctx
    }

    const ip = ctx.request.ip
    const status = ctx.status
    const responseTimeMs = `${Math.round(ctx.responseTime)}ms`
    const methodAndStatus = Color[ctx.request.method](
      `[${ctx.request.method}::${ctx.status}]`,
    )

    if (!this.configs.asJson) {
      return this.clean(
        `${methodAndStatus} - [${ip}] - ${new Date().toISOString()} - ${
          ctx.request.baseUrl
        } ${responseTimeMs}`,
      )
    }

    const metadata = {
      method: ctx.request.method,
      duration: responseTimeMs,
      status: status <= 399 ? 'SUCCESS' : 'ERROR',
      statusCode: status,
      url: ctx.request.hostUrl,
      path: ctx.request.baseUrl,
      createdAt: Date.now(),
      traceId: this.traceId(),
      data: ctx.data,
    }

    const request = {
      url: ctx.request.hostUrl,
      method: ctx.request.method,
      body: ctx.request.body,
      params: ctx.request.params,
      queries: ctx.request.queries,
      headers: ctx.request.headers,
    }

    const response = {
      body: ctx.body,
      headers: ctx.headers,
    }

    return JSON.stringify({ request, response, metadata })
  }
}
