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
import { Test, type Context } from '@athenna/test'
import { JsonFormatter } from '#src/formatters/JsonFormatter'

export default class JsonFormatterTest {
  @Test()
  public async shouldBeAbleToFormatLogsToJsonFormat({ assert }: Context) {
    const formatter = new JsonFormatter().config({ level: 'info' })

    const message = JSON.parse(formatter.format('hello'))

    assert.equal(message.msg, 'hello')
    assert.equal(message.level, 'info')
    assert.equal(message.pid, process.pid)
    assert.equal(message.traceId, null)
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
    })
  }
}
