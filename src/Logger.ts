import { Color } from './Utils/Color'
import { Config, Path } from '@secjs/utils'
import { DriverContract } from './Contracts/DriverContract'
import { DriverFactory } from 'src/Factories/DriverFactory'
import { FormatterContract } from './Contracts/FormatterContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export class Logger {
  private runtimeConfig: any
  private channelName: string
  private driver: DriverContract

  static buildDriver(
    name: string,
    driver: new (channel: string, configs?: any) => DriverContract,
  ) {
    DriverFactory.createDriver(name, driver)
  }

  static buildFormatter(name: string, formatter: new () => FormatterContract) {
    FormatterFactory.createFormatter(name, formatter)
  }

  static get drivers(): string[] {
    return DriverFactory.availableDrivers()
  }

  static get formatters(): string[] {
    return FormatterFactory.availableFormatters()
  }

  constructor(runtimeConfig: any = {}) {
    new Config().safeLoad(Path.config('logging'))

    this.runtimeConfig = runtimeConfig
    this.channelName = 'default'
    this.driver = DriverFactory.fabricate(this.channelName, this.runtimeConfig)
  }

  channel(channel: string, runtimeConfig?: any): Logger {
    if (runtimeConfig) this.runtimeConfig = runtimeConfig

    this.driver = DriverFactory.fabricate(channel, this.runtimeConfig)

    return this
  }

  async log(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    await this.driver.transport(message, options)
  }

  async info(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'INFO'
    options.color = Color.cyan
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }

  async warn(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'WARN'
    options.color = Color.orange
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }

  async error(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'ERROR'
    options.color = Color.red
    options.streamType = 'stderr'

    await this.driver.transport(message, options)
  }

  async debug(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'DEBUG'
    options.color = Color.purple
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }

  async success(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'SUCCESS'
    options.color = Color.green
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }
}
