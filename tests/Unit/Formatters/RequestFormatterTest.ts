/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { RequestFormatter } from '#src/Formatters/RequestFormatter'

test.group('RequestFormatterTest', () => {
  test('should be able to format logs to request format', async ({ assert }) => {
    const formatter = new RequestFormatter().config({ level: 'info' })

    const ctx = {
      status: 200,
      responseTime: 1,
      body: {
        hello: 'world',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      request: {
        ip: '127.0.0.1',
        method: 'GET',
        hostUrl: 'http://localhost:1335',
        baseUrl: 'http://localhost:1335/:id',
        params: {
          id: 1,
        },
        queries: {},
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }

    const message = formatter.format(ctx)

    assert.isTrue(message.includes('127.0.0.1'))
    assert.isTrue(message.includes('[GET::200]'))
    assert.isTrue(message.includes('http://localhost:1335/:id'))
    assert.isTrue(message.includes('ms'))
  })

  test('should be able to format logs to request format as json', async ({ assert }) => {
    const formatter = new RequestFormatter().config({ level: 'info', asJson: true })

    const ctx = {
      status: 200,
      responseTime: 1,
      body: {
        hello: 'world',
      },
      headers: {
        'Content-Type': 'application/json',
      },
      request: {
        ip: '127.0.0.1',
        method: 'GET',
        hostUrl: 'http://localhost:1335',
        baseUrl: 'http://localhost:1335/:id',
        params: {
          id: 1,
        },
        queries: {},
        headers: {
          'Content-Type': 'application/json',
        },
      },
    }

    const message = JSON.parse(formatter.format(ctx))

    assert.equal(message.metadata.method, ctx.request.method)
    assert.equal(message.metadata.duration, '1ms')
    assert.equal(message.metadata.status, 'SUCCESS')
    assert.equal(message.metadata.statusCode, 200)
    assert.equal(message.metadata.url, ctx.request.hostUrl)
    assert.equal(message.metadata.path, ctx.request.baseUrl)
    assert.isDefined(message.metadata.createdAt)
  })
})
