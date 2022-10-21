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
import { Folder, Path } from '@athenna/common'

import { Driver, DriverFactory } from '#src/index'
import { DriverExistException } from '#src/Exceptions/DriverExistException'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/Exceptions/NotImplementedConfigException'

class CustomDriver extends Driver {
  transport(level, message) {
    return `LOG: ${level}:${message}`
  }
}

test.group('DriverFactoryTest', group => {
  group.each.setup(async () => {
    await new Folder(Path.stubs('config')).copy(Path.config())
    await Config.safeLoad(Path.config('logging.js'))
  })

  group.each.teardown(async () => {
    await Folder.safeRemove(Path.config())
  })

  test('should be able to list all available drivers', async ({ assert }) => {
    const drivers = DriverFactory.availableDrivers()

    assert.deepEqual(drivers, ['file', 'null', 'slack', 'stack', 'console', 'discord', 'telegram'])
  })

  test('should throw not implemented config exception when trying to fabricate driver without loading config file', async ({
    assert,
  }) => {
    Config.configs = new Map()
    assert.throws(() => DriverFactory.fabricate('not-found'), NotImplementedConfigException)
  })

  test('should throw not implemented config exception when trying to fabricate driver when trying to load channel that does not exist', async ({
    assert,
  }) => {
    assert.throws(() => DriverFactory.fabricate('not-found'), NotImplementedConfigException)
  })

  test('should throw not found driver exception when trying to fabricate driver', async ({ assert }) => {
    assert.throws(() => DriverFactory.fabricate('notFound'), NotFoundDriverException)
  })

  test('should be able to create custom driver', async ({ assert }) => {
    DriverFactory.createDriver('custom', CustomDriver)

    const driver = DriverFactory.fabricate('custom')

    const message = driver.transport('info', 'hello')

    assert.equal(message, 'LOG: info:hello')
  })

  test('should throw driver exist exception when trying to create driver', async ({ assert }) => {
    assert.throws(() => DriverFactory.createDriver('file', CustomDriver), DriverExistException)
  })
})
