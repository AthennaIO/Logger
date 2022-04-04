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

  constructor(runtimeConfig: any = {}) {
    new Config().safeLoad(Path.config('logging'))

    this.runtimeConfig = runtimeConfig
    this.channelName = 'default'
    this.driver = DriverFactory.fabricate(this.channelName, this.runtimeConfig)
  }

  static get drivers(): string[] {
    return DriverFactory.availableDrivers()
  }

  static get formatters(): string[] {
    return FormatterFactory.availableFormatters()
  }

  static buildDriver(
    name: string,
    driver: new (channel: string, configs?: any) => DriverContract,
  ) {
    DriverFactory.createDriver(name, driver)
  }

  static buildFormatter(name: string, formatter: new () => FormatterContract) {
    FormatterFactory.createFormatter(name, formatter)
  }

  channel(channel: string, runtimeConfig?: any): Logger {
    if (runtimeConfig) this.runtimeConfig = runtimeConfig

    this.driver = DriverFactory.fabricate(channel, this.runtimeConfig)

    return this
  }

  log(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
    })

    return this.driver.transport(message, options)
  }

  info(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'INFO',
        color: Color.cyan,
      },
    })

    return this.driver.transport(message, options)
  }

  warn(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'WARN',
        color: Color.orange,
      },
    })

    return this.driver.transport(message, options)
  }

  error(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'ERROR',
        color: Color.red,
      },
    })

    return this.driver.transport(message, options)
  }

  debug(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'DEBUG',
        color: Color.purple,
      },
    })

    return this.driver.transport(message, options)
  }

  success(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'SUCCESS',
        color: Color.green,
      },
    })

    return this.driver.transport(message, options)
  }

  private createOptions(options: any, defaultValues: any): any {
    let formatterConfig = Object.assign(
      {},
      {
        ...defaultValues.formatterConfig,
      },
      options.formatterConfig,
    )

    if (this.runtimeConfig.formatterConfig) {
      formatterConfig = {
        ...this.runtimeConfig.formatterConfig,
        ...formatterConfig,
      }
    }

    options = Object.assign(
      {},
      {
        streamType: 'stdout',
      },
      options,
    )

    options = {
      ...options,
      formatterConfig,
    }

    return options
  }
}
