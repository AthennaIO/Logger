import { Logger } from './Logger'
import { DriverContract } from './Contracts/DriverContract'
import { FormatterContract } from './Contracts/FormatterContract'

export class Log {
  private static _options?: any = {}
  private static logger: Logger

  static options(options?: any) {
    this._options = options
  }

  static buildDriver(
    name: string,
    driver: new (channel: string, configs?: any) => DriverContract,
  ): typeof Log {
    Logger.buildDriver(name, driver)

    return this
  }

  static buildFormatter(
    name: string,
    formatter: new () => FormatterContract,
  ): typeof Log {
    Logger.buildFormatter(name, formatter)

    return this
  }

  static get drivers(): string[] {
    return Logger.drivers
  }

  static get formatters(): string[] {
    return Logger.formatters
  }

  static channel(channel: string): typeof Log {
    if (!this.logger) this.logger = new Logger()

    this.logger.channel(channel)

    return this
  }

  static log(message: any, options?: any) {
    options = {
      ...options,
      ...this._options,
    }

    this.logger.log(message, options)

    this.logger = new Logger()
  }

  static info(message: any, options?: any) {
    options = {
      ...options,
      ...this._options,
    }

    this.logger.info(message, options)

    this.logger = new Logger()
  }

  static warn(message: any, options?: any) {
    options = {
      ...options,
      ...this._options,
    }

    this.logger.warn(message, options)

    this.logger = new Logger()
  }

  static error(message: any, options?: any) {
    options = {
      ...options,
      ...this._options,
    }

    this.logger.error(message, options)

    this.logger = new Logger()
  }

  static debug(message: any, options?: any) {
    options = {
      ...options,
      ...this._options,
    }

    this.logger.debug(message, options)

    this.logger = new Logger()
  }

  static success(message: any, options?: any) {
    options = {
      ...options,
      ...this._options,
    }

    this.logger.success(message, options)

    this.logger = new Logger()
  }
}
