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
import { Test, BeforeEach, AfterEach, type Context } from '@athenna/test'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'
import { context, ROOT_CONTEXT, trace, TraceFlags, createContextKey } from '@opentelemetry/api'

const otelCurrentContextBagKey = Symbol.for('athenna.otel.currentContextBag')

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

  @Test()
  public async shouldBeAbleToResolveContextBindingsFromTheActiveOtelContext({ assert }: Context) {
    const tenantIdKey = createContextKey('tenant.id')
    const formatter = new JsonFormatter().config({
      level: 'info',
      contextBindings: [
        {
          field: 'tenantId',
          resolver: activeContext => activeContext.getValue(tenantIdKey)
        }
      ]
    })

    const message = context.with(context.active().setValue(tenantIdKey, 'tenant-1'), () =>
      JSON.parse(formatter.format('hello'))
    )

    assert.equal(message.msg, 'hello')
    assert.equal(message.tenantId, 'tenant-1')
  }

  @Test()
  public async shouldAllowExplicitPayloadToOverrideResolvedContextBindings({ assert }: Context) {
    const namespaceKey = createContextKey('log.namespace')
    const formatter = new JsonFormatter().config({
      level: 'info',
      defaults: {
        namespace: 'default'
      },
      contextBindings: [
        {
          field: 'namespace',
          resolver: activeContext => activeContext.getValue(namespaceKey)
        }
      ]
    })

    const message = context.with(context.active().setValue(namespaceKey, 'from-context'), () =>
      JSON.parse(
        formatter.format({
          namespace: 'from-payload'
        })
      )
    )

    assert.equal(message.namespace, 'from-payload')
  }

  @Test()
  public async shouldOmitUndefinedContextBindingsWhenFormattingLogs({ assert }: Context) {
    const formatter = new JsonFormatter().config({
      level: 'info',
      contextBindings: [
        {
          field: 'tenantId',
          resolver: () => undefined
        }
      ]
    })

    const message = JSON.parse(formatter.format('hello'))

    assert.isFalse(Object.hasOwn(message, 'tenantId'))
  }

  @Test()
  public async shouldAllowResolversToUseGetCurrentContextValueWithoutWithContextValue({ assert }: Context) {
    const { OtelImpl } = await import(new URL('../../../../Otel/src/otel/OtelImpl.js', import.meta.url).href)
    const otel = new OtelImpl()
    const formatter = new JsonFormatter().config({
      level: 'info',
      contextBindings: [
        {
          field: 'exampleId',
          resolver: activeContext => otel.getCurrentContextValue('exampleId', activeContext)
        }
      ]
    })
    const requestBag = new Map<string | symbol, unknown>([['exampleId', 'example-id-from-binding']])

    const message = context.with(context.active().setValue(otelCurrentContextBagKey as any, requestBag), () => {
      otel.setCurrentContextValue('exampleId', 'example-id-from-controller')

      return JSON.parse(
        formatter.format({
          msg: 'AppController.show'
        })
      )
    })

    assert.equal(message.msg, 'AppController.show')
    assert.equal(message.exampleId, 'example-id-from-controller')
  }
}
