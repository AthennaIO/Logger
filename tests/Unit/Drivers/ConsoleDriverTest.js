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
import { File, Path } from '@secjs/utils'

test.group('ConsoleDriverTest', group => {
  test('should be able to log in console', async ({ assert }) => {
    const file = await new File(Path.stubs('transporters/console.js')).load()

    await exec(`node --input-type=module --eval="${file.getContentSync().toString()}"`, (_, stdout, stderr) => {
      const logs = [...stdout.split('\n').filter(l => l !== ''), ...stderr.split('\n').filter(l => l !== '')]

      logs.forEach(log => {
        assert.isFalse(log.includes('TRACE'))
        assert.isTrue(log.includes('hello'))
      })
    })
  })
})