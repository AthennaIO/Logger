/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ColorHelper } from '#src/index'
import { Formatter } from '#src/Formatters/Formatter'

export class RequestFormatter extends Formatter {
  /**
   * Format the message.
   *
   * @param {any} ctx
   * @return {string}
   */
  format(ctx) {
    const ip = ctx.request.ip
    const status = ctx.status
    const responseTimeMs = `${Math.round(ctx.responseTime)}ms`
    const methodAndUrl = ColorHelper[ctx.request.method](
      `${ctx.request.method}::${ctx.request.baseUrl}`,
    )

    if (!this.configs.asJson) {
      return this.clean(
        `(${ip}) - [${status}] ${methodAndUrl} ${responseTimeMs}`,
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
