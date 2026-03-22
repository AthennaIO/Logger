/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { OtelDriver } from '#src/drivers/OtelDriver'
import { Test, AfterEach, BeforeEach, type Context } from '@athenna/test'
import { context, ROOT_CONTEXT, trace, TraceFlags } from '@opentelemetry/api'
import { logs, SeverityNumber, type LogRecord } from '@opentelemetry/api-logs'
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks'

class FakeLogger {
  public records: LogRecord[] = []

  public emit(logRecord: LogRecord): void {
    this.records.push(logRecord)
  }
}

class FakeLoggerProvider {
  public logger = new FakeLogger()

  public getLogger() {
    return this.logger
  }
}

export default class OtelDriverTest {
  @BeforeEach()
  public async beforeEach() {
    context.setGlobalContextManager(new AsyncLocalStorageContextManager().enable())
  }

  @AfterEach()
  public async afterEach() {
    logs.disable()
    context.disable()
  }

  @Test()
  public async shouldEmitLogsUsingTheOpenTelemetryLoggerProvider({ assert }: Context) {
    const provider = new FakeLoggerProvider()

    logs.setGlobalLoggerProvider(provider as any)

    const driver = new OtelDriver({ formatter: 'json' })

    driver.transport('error', 'failed to retrieve user')

    assert.lengthOf(provider.logger.records, 1)
    assert.equal(provider.logger.records[0].severityNumber, SeverityNumber.ERROR)
    assert.equal(provider.logger.records[0].severityText, 'ERROR')
    assert.equal(provider.logger.records[0].attributes['athenna.log.level'], 'error')
    assert.equal(provider.logger.records[0].attributes['athenna.log.stream'], 'stderr')
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    assert.equal(provider.logger.records[0].body.msg, 'failed to retrieve user')
  }

  @Test()
  public async shouldEmitLogsWithTheActiveOtelContext({ assert }: Context) {
    const provider = new FakeLoggerProvider()
    const spanContext = {
      traceId: '11111111111111111111111111111111',
      spanId: '2222222222222222',
      traceFlags: TraceFlags.SAMPLED
    }

    logs.setGlobalLoggerProvider(provider as any)

    const driver = new OtelDriver({ formatter: 'json' })

    context.with(trace.setSpanContext(ROOT_CONTEXT, spanContext), () => {
      driver.transport('info', 'hello')
    })

    const emittedContext = provider.logger.records[0].context

    assert.deepEqual(trace.getSpanContext(emittedContext), spanContext)
  }
}
