/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color, Is } from '@athenna/common'
import { Formatter } from '#src/formatters/Formatter'

export class RequestFormatter extends Formatter {
  public format(ctx: any): string {
    if (Is.String(ctx)) {
      return ctx
    }

    const statusCode = ctx.response.statusCode
    const responseTimeMs = `${Math.round(ctx.response.responseTime)}ms`
    const status = Color.statusCode(ctx.response.statusCode)
    const method = Color.httpMethod(ctx.request.method)
    const date = new Date().toISOString()

    if (!this.configs.asJson) {
      return this.clean(
        `${method}${status} ${ctx.request.baseUrl} - ${date} - ${responseTimeMs}`
      )
    }

    const metadata = {
      method: ctx.request.method,
      duration: responseTimeMs,
      status: statusCode <= 399 ? 'SUCCESS' : 'ERROR',
      statusCode,
      url: ctx.request.hostUrl,
      path: ctx.request.baseUrl,
      createdAt: Date.now(),
      traceId: this.traceId(),
      data: ctx.data
    }

    const request = {
      url: ctx.request.hostUrl,
      method: ctx.request.method,
      body: ctx.request.body,
      params: ctx.request.params,
      queries: ctx.request.queries,
      headers: ctx.request.headers
    }

    const response = {
      body: ctx.response.body,
      headers: ctx.response.headers
    }

    return JSON.stringify(
      { request, response, metadata },
      this.getCircularReplacer()
    )
  }
}
