/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { Config } from '@athenna/config'
import { File, Folder, Path } from '@athenna/common'

import { Log } from '#src/index'
import { LoggerProvider } from '#src/Providers/LoggerProvider'

test.group('FileDriverTest', group => {
  group.each.setup(async () => {
    await new Folder(Path.stubs('config')).copy(Path.config())
    await Config.safeLoad(Path.config('logging.js'))

    new LoggerProvider().register()
  })

  group.each.teardown(async () => {
    await Folder.safeRemove(Path.config())
    await Folder.safeRemove(Path.storage())
  })

  test('should be able to log in files', async ({ assert }) => {
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

    const fileContent = (await new File(filePath).load()).getContentSync().toString()
    const logs = fileContent.split('\n')

    logs
      .filter(log => log !== '')
      .forEach(log => {
        log = JSON.parse(log)

        if (log.msg) assert.equal(log.msg, 'hello')
        else assert.equal(log.hello, 'world!')
      })
  })
})
