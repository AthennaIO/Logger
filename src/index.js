import Chalk from 'chalk'

import { Is, Options } from '@secjs/utils'

import { ColorHelper } from '#src/Helpers/ColorHelper'
import { DriverFactory } from '#src/Factories/DriverFactory'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

export * from './Facades/Log.js'
export * from './Helpers/ColorHelper.js'
export * from './Helpers/FactoryHelper.js'
export * from './Factories/DriverFactory.js'
export * from './Factories/FormatterFactory.js'

export class Logger {
  /**
   * Runtime configurations to be used inside the Drivers and Formatters.
   *
   * @type {any}
   */
  #runtimeConfig = {}

  /**
   * The driver responsible for transporting the logs.
   *
   * @type {any[]}
   */
  #drivers = []

  /**
   * The log channel selected with driver and formatter configurations.
   *
   * @type {string[]}
   */
  #channelNames = []

  /**
   * Creates a new instance of Logger.
   *
   * @return {Logger}
   */
  constructor() {
    this.#drivers.push(DriverFactory.fabricate('default', this.#runtimeConfig))
  }

  /**
   * Return all drivers available.
   *
   * @return {string[]}
   */
  static get drivers() {
    return DriverFactory.availableDrivers()
  }

  /**
   * Return all formatters available.
   *
   * @return {string[]}
   */
  static get formatters() {
    return FormatterFactory.availableFormatters()
  }

  /**
   * Applies the log engine to execute chalk methods of string.
   *
   * @param {string} content
   */
  static #applyLogEngine(content) {
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
   * Transport the log.
   *
   * @param {string|any} message
   * @param {any} [options]
   * @param {any} [defaultValues]
   * @return {void | Promise<void>}
   */
  #log(message, options = {}, defaultValues = {}) {
    options = this.#createOptions(options, defaultValues)

    message = Logger.#applyLogEngine(message)

    const promises = this.#drivers.map(d => d.transport(message, options))

    return Promise.all(promises)
  }

  /**
   * Create options concatenating client options with default options.
   *
   * @param {any} options
   * @param {any} defaultValues
   * @return {any}
   */
  #createOptions(options, defaultValues) {
    let formatterConfig = Options.create(
      options.formatterConfig,
      defaultValues.formatterConfig,
    )

    if (this.#runtimeConfig.formatterConfig) {
      formatterConfig = {
        ...this.#runtimeConfig.formatterConfig,
        ...formatterConfig,
      }
    }

    options = {
      ...options,
      formatterConfig,
    }

    return options
  }

  /**
   * Set runtime configurations for drivers and
   * formatters.
   *
   * @param {any} runtimeConfig
   * @return {Logger}
   */
  config(runtimeConfig) {
    this.#runtimeConfig = runtimeConfig

    return this
  }

  /**
   * Change the log channel.
   *
   * @param {string[]} channels
   * @return {Logger}
   */
  channel(...channels) {
    this.#drivers = []
    this.#channelNames = channels

    channels.forEach(channel => {
      this.#drivers.push(DriverFactory.fabricate(channel, this.#runtimeConfig))
    })

    return this
  }

  /**
   * Creates a log of type info in channel.
   *
   * @param {string|any} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  info(message, options = {}) {
    return this.#log(message, options, {
      formatterConfig: {
        level: 'INFO',
        chalk: ColorHelper.cyan,
      },
    })
  }

  /**
   * Creates a log of type warn in channel.
   *
   * @param {string|any} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  warn(message, options = {}) {
    return this.#log(message, options, {
      formatterConfig: {
        level: 'WARN',
        chalk: ColorHelper.orange,
      },
    })
  }

  /**
   * Creates a log of type error in channel.
   *
   * @param {string|any} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  error(message, options = {}) {
    return this.#log(message, options, {
      formatterConfig: {
        level: 'ERROR',
        chalk: ColorHelper.red,
      },
    })
  }

  /**
   * Creates a log of type critical in channel.
   *
   * @param {string|any} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  critical(message, options = {}) {
    return this.#log(message, options, {
      formatterConfig: {
        level: 'CRITICAL',
        chalk: ColorHelper.darkRed,
      },
    })
  }

  /**
   * Creates a log of type debug in channel.
   *
   * @param {string|any} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  debug(message, options = {}) {
    return this.#log(message, options, {
      formatterConfig: {
        level: 'DEBUG',
        chalk: ColorHelper.purple,
      },
    })
  }

  /**
   * Creates a log of type success in channel.
   *
   * @param {string|any} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  success(message, options = {}) {
    return this.#log(message, options, {
      formatterConfig: {
        level: 'SUCCESS',
        chalk: ColorHelper.green,
      },
    })
  }
}
