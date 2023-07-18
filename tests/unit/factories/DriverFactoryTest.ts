/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@athenna/config'
import { ObjectBuilder, Path } from '@athenna/common'

import { Driver, DriverFactory } from '#src'
import type { Context } from '@athenna/test/types'
import { AfterEach, BeforeEach, Test } from '@athenna/test'
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
    await Config.loadAll(Path.stubs('config'))
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
    assert,
  }: Context) {
    Config.configs = new ObjectBuilder()
    assert.throws(() => DriverFactory.fabricate('not-found'), NotImplementedConfigException)
  }

  @Test()
  public async shouldThrowNotImplementedConfigExceptionWhenTryingToFabricateDriverWhenTryingToLoadChannelThatDoesNotExist({
    assert,
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
}
