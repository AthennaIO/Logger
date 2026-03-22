/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { RequestFormatter } from '#src/formatters/RequestFormatter'
import { Test, BeforeEach, AfterEach, type Context } from '@athenna/test'
import { context, ROOT_CONTEXT, trace, TraceFlags } from '@opentelemetry/api'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'

export default class RequestFormatterTest {
  @BeforeEach()
  public async beforeEach() {
    context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable())
  }

  @AfterEach()
  public async afterEach() {
    context.disable()
  }

  @Test()
  public async shouldBeAbleToFormatLogsToRequestFormat({ assert }: Context) {
    const formatter = new RequestFormatter().config({ level: 'info' })

    const ctx = {
      body: {
        hello: 'world'
      },
      headers: {
        'Content-Type': 'application/json'
      },
      request: {
        ip: '127.0.0.1',
        method: 'GET',
        hostUrl: 'http://localhost:1335',
        baseUrl: 'http://localhost:1335/:id',
        params: {
          id: 1
        },
        queries: {},
        headers: {
          'Content-Type': 'application/json'
        }
      },
      response: {
        statusCode: 200,
        responseTime: 1,
        body: {
          hello: 'world'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }

    const message = formatter.format(ctx)

    assert.isTrue(message.includes('GET'))
    assert.isTrue(message.includes('http://localhost:1335/:id'))
    assert.isTrue(message.includes('ms'))
  }

  @Test()
  public async shouldBeAbleToFormatLogsToRequestFormatAsJson({ assert }: Context) {
    const formatter = new RequestFormatter().config({ level: 'info', asJson: true })

    const ctx = {
      request: {
        ip: '127.0.0.1',
        method: 'GET',
        hostUrl: 'http://localhost:1335',
        baseUrl: 'http://localhost:1335/:id',
        params: {
          id: 1
        },
        queries: {},
        headers: {
          'Content-Type': 'application/json'
        }
      },
      response: {
        statusCode: 200,
        responseTime: 1,
        body: {
          hello: 'world'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }

    const message = JSON.parse(formatter.format(ctx))

    assert.equal(message.metadata.method, ctx.request.method)
    assert.equal(message.metadata.duration, '1ms')
    assert.equal(message.metadata.status, 'SUCCESS')
    assert.equal(message.metadata.statusCode, 200)
    assert.equal(message.metadata.url, ctx.request.hostUrl)
    assert.equal(message.metadata.path, ctx.request.baseUrl)
    assert.isDefined(message.metadata.createdAt)
    assert.equal(message.metadata.spanId, null)
  }

  @Test()
  public async shouldBeAbleToSetAStringAsCtxAndDontGetErrors({ assert }: Context) {
    const formatter = new RequestFormatter().config({ level: 'info', asJson: true })

    const ctx = 'hello'

    assert.equal(formatter.format(ctx), 'hello')
  }

  @Test()
  public async shouldIncludeActiveOtelSpanCorrelationWhenFormattingAsJson({ assert }: Context) {
    const formatter = new RequestFormatter().config({ level: 'info', asJson: true })
    const spanContext = {
      traceId: '11111111111111111111111111111111',
      spanId: '2222222222222222',
      traceFlags: TraceFlags.SAMPLED
    }
    const ctx = {
      request: {
        ip: '127.0.0.1',
        method: 'GET',
        hostUrl: 'http://localhost:1335',
        baseUrl: 'http://localhost:1335/:id',
        params: {
          id: 1
        },
        queries: {},
        headers: {
          'Content-Type': 'application/json'
        }
      },
      response: {
        statusCode: 200,
        responseTime: 1,
        body: {
          hello: 'world'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }

    const message = context.with(trace.setSpanContext(ROOT_CONTEXT, spanContext), () =>
      JSON.parse(formatter.format(ctx))
    )

    assert.equal(message.metadata.traceId, spanContext.traceId)
    assert.equal(message.metadata.spanId, spanContext.spanId)
  }
}
