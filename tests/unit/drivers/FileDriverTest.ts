/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Log, LoggerProvider } from '#src'
import type { Context } from '@athenna/test/types'
import { File, Folder, Path } from '@athenna/common'
import { Test, AfterEach, BeforeEach } from '@athenna/test'

export default class FileDriverTest {
  @BeforeEach()
  public async beforeEach() {
    await Config.loadAll(Path.stubs('config'))

    new LoggerProvider().register()
  }

  @AfterEach()
  public async afterEach() {
    Config.clear()
    await Folder.safeRemove(Path.storage())
  }

  @Test()
  public async shouldBeAbleToLogInFiles({ assert }: Context) {
    const filePath = Path.storage('athenna.log')

    const log = Log.config({ level: 'success', filePath, formatter: 'json' }).channel('file')
    const message = 'hello'

    await log.trace(message)
    await log.debug(message)
    await log.info(message)
    await log.success({ hello: 'world!' })
    await log.warn(message)
    await log.error({ hello: 'world!' })
    await log.fatal(message)

    const fileContent = await new File(filePath).getContentAsString()
    const logs = fileContent.split('\n')

    logs
      .filter(log => log !== '')
      .forEach((log: any) => {
        log = JSON.parse(log)

        if (log.msg) assert.equal(log.msg, 'hello')
        else assert.equal(log.hello, 'world!')
      })
  }

  @Test()
  public async shouldBeAbleToUseTheLogEngineWithNewLines({ assert }: Context) {
    const filePath = Path.storage('athenna.log')

    const log = Log.config({ level: 'success', filePath, formatter: 'cli' }).channel('file')

    const object = { hello: 'world!' }
    const objectString = JSON.stringify(object, null, 2)

    await log.success('hello ({yellow, bold} world!)')
    await log.success(`hello ({yellow, bold} ${objectString})`)

    const fileContent = await new File(filePath).getContentAsString()
    const logs = fileContent.split('\n').filter(log => log !== '')

    assert.lengthOf(logs, 4)
  }
}
