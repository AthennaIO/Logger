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
import { Folder, Path } from '@athenna/common'
import { AfterEach, BeforeEach, Test, Timeout } from '@athenna/test'

export default class TelegramDriverTest {
  @BeforeEach()
  public async beforeEach() {
    await new Folder(Path.stubs('config')).copy(Path.config())
    await Config.safeLoad(Path.config('logging.ts'))

    new LoggerProvider().register()
  }

  @AfterEach()
  public async afterEach() {
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.storage())
  }

  @Test()
  @Timeout(10000)
  public async shouldBeAbleToLogInTelegram({ assert }) {
    const log = Log.config({ level: 'success' }).channel('telegram')

    const message = 'hello'

    const [traceRes] = await log.trace(message)
    const [debugRes] = await log.debug(message)
    const [infoRes] = await log.info(message)
    const [successRes] = await log.success({ hello: 'world!' })
    const [warnRes] = await log.warn(message)
    const [errorRes] = await log.error({ hello: 'world!' })
    const [fatalRes] = await log.fatal(message)

    assert.isUndefined(traceRes)
    assert.isUndefined(debugRes)
    assert.isUndefined(infoRes)

    assert.equal(successRes.from.first_name, 'Athenna')
    assert.equal(warnRes.from.first_name, 'Athenna')
    assert.equal(errorRes.from.first_name, 'Athenna')
    assert.equal(fatalRes.from.first_name, 'Athenna')
  }
}
