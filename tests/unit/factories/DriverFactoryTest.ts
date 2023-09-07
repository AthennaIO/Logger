/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { Driver, DriverFactory } from '#src'
import { FileDriver } from '#src/drivers/FileDriver'
import { ObjectBuilder, Path } from '@athenna/common'
import { ConsoleDriver } from '#src/drivers/ConsoleDriver'
import { Test, AfterEach, BeforeEach, type Context } from '@athenna/test'
import { DriverExistException } from '#src/exceptions/DriverExistException'
import { NotFoundDriverException } from '#src/exceptions/NotFoundDriverException'
import { NotImplementedConfigException } from '#src/exceptions/NotImplementedConfigException'

class CustomDriver extends Driver {
  public transport(level: string, message: any): any {
    return `LOG: ${level}:${message}`
  }
}

export default class DriverFactoryTest {
  @BeforeEach()
  public async beforeEach() {
    await Config.loadAll(Path.fixtures('config'))
  }

  @AfterEach()
  public async afterEach() {
    Config.clear()
  }

  @Test()
  public async shouldBeAbleToListAllAvailableDrivers({ assert }: Context) {
    const drivers = DriverFactory.availableDrivers()

    assert.deepEqual(drivers, ['file', 'null', 'slack', 'stack', 'console', 'discord', 'telegram'])
  }

  @Test()
  public async shouldThrowNotImplementedConfigExceptionWhenTryingToFabricateDriverWithoutLoadingConfigFile({
    assert
  }: Context) {
    Config.configs = new ObjectBuilder()
    assert.throws(() => DriverFactory.fabricate('not-found'), NotImplementedConfigException)
  }

  @Test()
  public async shouldThrowNotImplementedConfigExceptionWhenTryingToFabricateDriverWhenTryingToLoadChannelThatDoesNotExist({
    assert
  }: Context) {
    assert.throws(() => DriverFactory.fabricate('not-found'), NotImplementedConfigException)
  }

  @Test()
  public async shouldThrowNotFoundDriverExceptionWhenTryingToFabricateDriver({ assert }: Context) {
    assert.throws(() => DriverFactory.fabricate('notFound'), NotFoundDriverException)
  }

  @Test()
  public async shouldBeAbleToCreateCustomerDriver({ assert }: Context) {
    DriverFactory.createDriver('custom', CustomDriver)

    const driver = DriverFactory.fabricate('custom')

    const message = driver.transport('info', 'hello')

    assert.equal(message, 'LOG: info:hello')
  }

  @Test()
  public async shouldThrowDriverExistExceptionWhenTryingToCreateDriver({ assert }: Context) {
    assert.throws(() => DriverFactory.createDriver('file', CustomDriver), DriverExistException)
  }

  @Test()
  public async shouldBeAbleToCreateVanillaDrivers({ assert }: Context) {
    const driver = DriverFactory.fabricateVanilla()

    assert.instanceOf(driver, ConsoleDriver)
  }

  @Test()
  public async shouldBeAbleToCreateVanillaDriversForDifferentDrivers({ assert }: Context) {
    const driver = DriverFactory.fabricateVanilla({ driver: 'file' })

    assert.instanceOf(driver, FileDriver)
  }

  @Test()
  public async shouldThrowIfVanillaDriverDoesNotExist({ assert }: Context) {
    assert.throws(() => DriverFactory.fabricateVanilla({ driver: 'not-found' }), NotFoundDriverException)
  }

  @Test()
  public async shouldGetTheDefaultChannelValueIfDefaultIsUsedInGetChannelConfig({ assert }: Context) {
    const config = DriverFactory.getChannelConfig('default')

    assert.deepEqual(config, Config.get('logging.channels.application'))
  }
}
