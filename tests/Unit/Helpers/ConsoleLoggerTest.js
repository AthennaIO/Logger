/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { exec } from 'node:child_process'

import { test } from '@japa/runner'
import { File, Path } from '@athenna/common'

test.group('ConsoleLoggerTest', group => {
  test('should be able to log in console using console logger', async ({ assert }) => {
    const file = await new File(Path.stubs('transporters/consoleLogger.js')).load()

    await exec(`node --input-type=module --eval="${file.getContentSync().toString()}"`, (_, stdout, stderr) => {
      const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')]

      logs.forEach(log => {
        assert.isFalse(log.includes('TRACE'))
        assert.isTrue(log.includes('hello'))
      })
    })
  })
})
