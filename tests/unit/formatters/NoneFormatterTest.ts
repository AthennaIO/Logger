/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Test } from '@athenna/test'
import { Color } from '@athenna/common'
import type { Context } from '@athenna/test/types'
import { NoneFormatter } from '#src/formatters/NoneFormatter'

export default class NoneFormatterTest {
  @Test()
  public async shouldBeAbleToFormatLogsToNoneFormat({ assert }: Context) {
    const formatter = new NoneFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.equal(message, 'hello')
  }

  @Test()
  public async shouldBeAbleToApplyChalkColorsInMessage({ assert }: Context) {
    const formatter = new NoneFormatter().config({ level: 'info', clean: false, chalk: Color.gray })

    const message = formatter.format('hello')

    assert.equal(message, Color.gray('hello'))
  }

  @Test()
  public async shouldReturnTheCliLevelWithoutAnyColorIfTheLevelDoesNotExist({ assert }: Context) {
    const formatter = new NoneFormatter().config({ level: 'not-found' })

    const level = formatter.cliLevel()

    assert.equal(level, Color.bold('[  not-found  ]'))
  }

  @Test()
  public async shouldReturnTheSimpleLevelWithoutAnyColorIfTheLevelDoesNotExist({ assert }: Context) {
    const formatter = new NoneFormatter().config({ level: 'not-found' })

    const level = formatter.simpleLevel()

    assert.equal(level, Color.bold('[NOT-FOUND]'))
  }

  @Test()
  public async shouldReturnTheCustomEmojiIfItExists({ assert }: Context) {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const emoji = formatter.getEmojiByLevel('info', '\u{1F43E}')

    assert.equal(emoji, '\u{1F43E}')
  }

  @Test()
  public async shouldReturnAnEmptyStringIfTheLevelDoesNotExistInTheDictionary({ assert }: Context) {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const emoji = formatter.getEmojiByLevel('not-found')

    assert.equal(emoji, '')
  }

  @Test()
  public async shouldReturnTheMessageWithoutAnyColorIfTheLevelDoesNotExistInTheDictionary({ assert }: Context) {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const message = formatter.paintMessageByLevel('not-found', 'hello')

    assert.equal(message, 'hello')
  }
}
