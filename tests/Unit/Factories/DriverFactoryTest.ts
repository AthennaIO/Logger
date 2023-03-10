/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Folder, ObjectBuilder, Path } from '@athenna/common'

import { Driver, DriverFactory } from '#src'
import { AfterEach, BeforeEach, Test, TestContext } from '@athenna/test'
import { DriverExistException } from '#src/Exceptions/DriverExistException'
import { NotFoundDriverException } from '#src/Exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/Exceptions/NotImplementedConfigException'

class CustomDriver extends Driver {
  public transport(level: string, message: any): any {
    return `LOG: ${level}:${message}`
  }
}

export default class DriverFactoryTest {
  @BeforeEach()
  public async beforeEach() {
    await new Folder(Path.stubs('config')).copy(Path.config())
    await Config.safeLoad(Path.config('logging.ts'))
  }

  @AfterEach()
  public async afterEach() {
    await Folder.safeRemove(Path.config())
  }

  @Test()
  public async shouldBeAbleToListAllAvailableDrivers({ assert }: TestContext) {
    const drivers = DriverFactory.availableDrivers()

    assert.deepEqual(drivers, ['file', 'null', 'slack', 'stack', 'console', 'discord', 'telegram'])
  }

  @Test()
  public async shouldThrowNotImplementedConfigExceptionWhenTryingToFabricateDriverWithoutLoadingConfigFile({
    assert,
  }: TestContext) {
    Config.configs = new ObjectBuilder()
    assert.throws(() => DriverFactory.fabricate('not-found'), NotImplementedConfigException)
  }

  @Test()
  public async shouldThrowNotImplementedConfigExceptionWhenTryingToFabricateDriverWhenTryingToLoadChannelThatDoesNotExist({
    assert,
  }: TestContext) {
    assert.throws(() => DriverFactory.fabricate('not-found'), NotImplementedConfigException)
  }

  @Test()
  public async shouldThrowNotFoundDriverExceptionWhenTryingToFabricateDriver({ assert }: TestContext) {
    assert.throws(() => DriverFactory.fabricate('notFound'), NotFoundDriverException)
  }

  @Test()
  public async shouldBeAbleToCreateCustomerDriver({ assert }: TestContext) {
    DriverFactory.createDriver('custom', CustomDriver)

    const driver = DriverFactory.fabricate('custom')

    const message = driver.transport('info', 'hello')

    assert.equal(message, 'LOG: info:hello')
  }

  @Test()
  public async shouldThrowDriverExistExceptionWhenTryingToCreateDriver({ assert }: TestContext) {
    assert.throws(() => DriverFactory.createDriver('file', CustomDriver), DriverExistException)
  }
}
