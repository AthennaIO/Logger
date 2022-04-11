import Chalk from 'chalk'
import { Is } from '@secjs/utils'
import { Color } from './Utils/Color'
import { DriverContract } from './Contracts/DriverContract'
import { DriverFactory } from 'src/Factories/DriverFactory'
import { FormatterContract } from './Contracts/FormatterContract'
import { FormatterFactory } from 'src/Factories/FormatterFactory'

export class Logger {
  /**
   * Runtime configurations to be used inside the Drivers and Formatters.
   * @private
   */
  private runtimeConfig: any = {}

  /**
   * The driver responsible for transporting the logs.
   * @private
   */
  private driver: DriverContract

  /**
   * The log channel selected with driver and formatter configurations.
   * @private
   */
  private channelName = 'default'

  /**
   * Creates a new instance of Logger.
   *
   * @return {Logger}
   */
  constructor() {
    this.driver = DriverFactory.fabricate(this.channelName, this.runtimeConfig)
  }

  /**
   * Return all drivers available.
   */
  static get drivers(): string[] {
    return DriverFactory.availableDrivers()
  }

  /**
   * Return all formatters available.
   */
  static get formatters(): string[] {
    return FormatterFactory.availableFormatters()
  }

  /**
   * Builds a new driver to use within Logger class.
   *
   * @param name
   * @param driver
   */
  static buildDriver(
    name: string,
    driver: new (channel: string, configs?: any) => DriverContract,
  ) {
    DriverFactory.createDriver(name, driver)
  }

  /**
   * Builds a new formatter to use within Logger class.
   *
   * @param name
   * @param formatter
   */
  static buildFormatter(name: string, formatter: new () => FormatterContract) {
    FormatterFactory.createFormatter(name, formatter)
  }

  /**
   * Applies the log engine to execute chalk methods of string.
   *
   * @param content
   * @private
   */
  private static applyLogEngine(content: string) {
    if (Is.String(content)) {
      const matches = content.match(/\({(.*?)} (.*?)\)/)

      if (matches) {
        const chalkMethodsString = matches[1].replace(/\s/g, '')
        const chalkMethodsArray = chalkMethodsString.split(',')
        const message = matches[2]

        let chalk = Chalk

        chalkMethodsArray.forEach(chalkMethod => {
          if (!chalk[chalkMethod]) return

          chalk = chalk[chalkMethod]
        })

        content = content
          .replace(`({${matches[1]}} `, '')
          .replace(`({${matches[1]}}`, '')
          .replace(`${matches[2]})`, chalk(message))
      }

      return content
    }

    return content
  }

  /**
   * Change the log channel.
   *
   * @param channel
   * @param runtimeConfig
   */
  channel(channel: string, runtimeConfig?: any): Logger {
    if (runtimeConfig) this.runtimeConfig = runtimeConfig

    this.driver = DriverFactory.fabricate(channel, this.runtimeConfig)
    this.channelName = channel

    return this
  }

  /**
   * Creates a log of type log in channel.
   * @param message
   * @param options
   */
  log(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {})

    message = Logger.applyLogEngine(message)

    return this.driver.transport(message, options)
  }

  /**
   * Creates a log of type info in channel.
   *
   * @param message
   * @param options
   */
  info(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      formatterConfig: {
        level: 'INFO',
        chalk: Color.cyan,
      },
    })

    message = Logger.applyLogEngine(message)

    return this.driver.transport(message, options)
  }

  /**
   * Creates a log of type warn in channel.
   *
   * @param message
   * @param options
   */
  warn(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'WARN',
        chalk: Color.orange,
      },
    })

    message = Logger.applyLogEngine(message)

    return this.driver.transport(message, options)
  }

  /**
   * Creates a log of type error in channel.
   *
   * @param message
   * @param options
   */
  error(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'ERROR',
        chalk: Color.red,
      },
    })

    message = Logger.applyLogEngine(message)

    return this.driver.transport(message, options)
  }

  /**
   * Creates a log of type debug in channel.
   *
   * @param message
   * @param options
   */
  debug(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'DEBUG',
        chalk: Color.purple,
      },
    })

    message = Logger.applyLogEngine(message)

    return this.driver.transport(message, options)
  }

  /**
   * Creates a log of type success in channel.
   *
   * @param message
   * @param options
   */
  success(message: any, options = {}): void | Promise<void> {
    options = this.createOptions(options, {
      streamType: 'stdout',
      formatterConfig: {
        level: 'SUCCESS',
        chalk: Color.green,
      },
    })

    message = Logger.applyLogEngine(message)

    return this.driver.transport(message, options)
  }

  /**
   * Create options concatenating client options with default options.
   *
   * @param options
   * @param defaultValues
   * @private
   */
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
