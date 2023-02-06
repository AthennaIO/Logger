/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { NoneFormatter } from '#src/Formatters/NoneFormatter'
import { Color } from '@athenna/common'

test.group('NoneFormatterTest', () => {
  test('should be able to format logs to none format', async ({ assert }) => {
    const formatter = new NoneFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.equal(message, 'hello')
  })

  test('should be able to apply chalk colors in message', async ({ assert }) => {
    const formatter = new NoneFormatter().config({ level: 'info', clean: false, chalk: Color.gray })

    const message = formatter.format('hello')

    assert.equal(message, Color.gray('hello'))
  })

  test('should return the cli level without any color if the level does not exist', async ({ assert }) => {
    const formatter = new NoneFormatter().config({ level: 'not-found' })

    const level = formatter.cliLevel()

    assert.equal(level, Color.bold('[  not-found  ]'))
  })

  test('should return the simple level without any color if the level does not exist', async ({ assert }) => {
    const formatter = new NoneFormatter().config({ level: 'not-found' })

    const level = formatter.simpleLevel()

    assert.equal(level, Color.bold('[NOT-FOUND]'))
  })

  test('should return the custom emoji if it exists', async ({ assert }) => {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const emoji = formatter.getEmojiByLevel('info', '\u{1F43E}')

    assert.equal(emoji, '\u{1F43E}')
  })

  test('should return an empty string if the level does not exist in the dictionary', async ({ assert }) => {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const emoji = formatter.getEmojiByLevel('not-found')

    assert.equal(emoji, '')
  })

  test('should return the message without any color if the level does not exist in the dictionary', async ({
    assert,
  }) => {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const message = formatter.paintMessageByLevel('not-found', 'hello')

    assert.equal(message, 'hello')
  })
})
