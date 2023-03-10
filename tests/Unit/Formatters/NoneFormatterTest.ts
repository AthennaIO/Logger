/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Color } from '@athenna/common'
import { Test, TestContext } from '@athenna/test'
import { NoneFormatter } from '#src/Formatters/NoneFormatter'

export default class NoneFormatterTest {
  @Test()
  public async shouldBeAbleToFormatLogsToNoneFormat({ assert }: TestContext) {
    const formatter = new NoneFormatter().config({ level: 'info' })

    const message = formatter.format('hello')

    assert.equal(message, 'hello')
  }

  @Test()
  public async shouldBeAbleToApplyChalkColorsInMessage({ assert }: TestContext) {
    const formatter = new NoneFormatter().config({ level: 'info', clean: false, chalk: Color.gray })

    const message = formatter.format('hello')

    assert.equal(message, Color.gray('hello'))
  }

  @Test()
  public async shouldReturnTheCliLevelWithoutAnyColorIfTheLevelDoesNotExist({ assert }: TestContext) {
    const formatter = new NoneFormatter().config({ level: 'not-found' })

    const level = formatter.cliLevel()

    assert.equal(level, Color.bold('[  not-found  ]'))
  }

  @Test()
  public async shouldReturnTheSimpleLevelWithoutAnyColorIfTheLevelDoesNotExist({ assert }: TestContext) {
    const formatter = new NoneFormatter().config({ level: 'not-found' })

    const level = formatter.simpleLevel()

    assert.equal(level, Color.bold('[NOT-FOUND]'))
  }

  @Test()
  public async shouldReturnTheCustomEmojiIfItExists({ assert }: TestContext) {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const emoji = formatter.getEmojiByLevel('info', '\u{1F43E}')

    assert.equal(emoji, '\u{1F43E}')
  }

  @Test()
  public async shouldReturnAnEmptyStringIfTheLevelDoesNotExistInTheDictionary({ assert }: TestContext) {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const emoji = formatter.getEmojiByLevel('not-found')

    assert.equal(emoji, '')
  }

  @Test()
  public async shouldReturnTheMessageWithoutAnyColorIfTheLevelDoesNotExistInTheDictionary({ assert }: TestContext) {
    const formatter = new NoneFormatter().config({ level: 'info' })
    const message = formatter.paintMessageByLevel('not-found', 'hello')

    assert.equal(message, 'hello')
  }
}
