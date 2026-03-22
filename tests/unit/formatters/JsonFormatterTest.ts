/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Is } from '@athenna/common'
import { runWithId } from 'cls-rtracer'
import { JsonFormatter } from '#src/formatters/JsonFormatter'
import { context, ROOT_CONTEXT, trace, TraceFlags } from '@opentelemetry/api'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { Test, BeforeEach, AfterEach, type Context } from '@athenna/test'

export default class JsonFormatterTest {
  @BeforeEach()
  public async beforeEach() {
    context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable())
  }

  @AfterEach()
  public async afterEach() {
    context.disable()
  }

  @Test()
  public async shouldBeAbleToFormatLogsToJsonFormat({ assert }: Context) {
    const formatter = new JsonFormatter().config({ level: 'info' })

    const message = JSON.parse(formatter.format('hello'))

    assert.equal(message.msg, 'hello')
    assert.equal(message.level, 'info')
    assert.equal(message.pid, process.pid)
    assert.equal(message.traceId, null)
    assert.equal(message.spanId, null)
  }

  @Test()
  public async shouldBeAbleToFormatLogsToJsonFormatWithTheTraceId({ assert }: Context) {
    const formatter = new JsonFormatter().config({ level: 'info' })

    runWithId(() => {
      const message = JSON.parse(formatter.format('hello'))

      assert.equal(message.msg, 'hello')
      assert.equal(message.level, 'info')
      assert.equal(message.pid, process.pid)
      assert.isTrue(Is.Uuid(message.traceId))
      assert.equal(message.spanId, null)
    })
  }

  @Test()
  public async shouldPreferTheActiveOtelSpanForTraceCorrelation({ assert }: Context) {
    const formatter = new JsonFormatter().config({ level: 'info' })
    const spanContext = {
      traceId: '11111111111111111111111111111111',
      spanId: '2222222222222222',
      traceFlags: TraceFlags.SAMPLED
    }

    const message = context.with(trace.setSpanContext(ROOT_CONTEXT, spanContext), () =>
      JSON.parse(formatter.format('hello'))
    )

    assert.equal(message.traceId, spanContext.traceId)
    assert.equal(message.spanId, spanContext.spanId)
  }

  @Test()
  public async shouldBeAbleToFormatLogsToJsonFormatWithDefaults({ assert }: Context) {
    const formatter = new JsonFormatter().config({
      level: 'info',
      defaults: {
        namespace: 'UserService'
      }
    })

    const message = JSON.parse(formatter.format('hello'))

    assert.equal(message.msg, 'hello')
    assert.equal(message.namespace, 'UserService')
    assert.equal(message.level, 'info')
  }
}
