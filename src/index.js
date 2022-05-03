import Chalk from 'chalk'

import { Is, Options } from '@secjs/utils'

import { ColorHelper } from '#src/Helpers/ColorHelper'
import { DriverFactory } from '#src/Factories/DriverFactory'
import { FormatterFactory } from '#src/Factories/FormatterFactory'

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
  #driver

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
    this.#driver.push(DriverFactory.fabricate('default', this.#runtimeConfig))
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
    this.#driver = []
    this.#channelNames = channels

    channels.forEach(channel => {
      this.#driver.push(DriverFactory.fabricate(channel, this.#runtimeConfig))
    })

    return this
  }

  /**
   * Creates a log of type log in channel.
   *
   * @param {string} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  log(message, options = {}) {
    options = this.#createOptions(options, {})

    message = Logger.#applyLogEngine(message)

    const promises = this.#driver.map(d => d.transport(message, options))

    return Promise.all(promises)
  }

  /**
   * Creates a log of type info in channel.
   *
   * @param {string} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  info(message, options = {}) {
    options = this.#createOptions(options, {
      formatterConfig: {
        level: 'INFO',
        chalk: ColorHelper.cyan,
      },
    })

    message = Logger.#applyLogEngine(message)

    const promises = this.#driver.map(d => d.transport(message, options))

    return Promise.all(promises)
  }

  /**
   * Creates a log of type warn in channel.
   *
   * @param {string} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  warn(message, options = {}) {
    options = this.#createOptions(options, {
      formatterConfig: {
        level: 'WARN',
        chalk: ColorHelper.orange,
      },
    })

    message = Logger.#applyLogEngine(message)

    const promises = this.#driver.map(d => d.transport(message, options))

    return Promise.all(promises)
  }

  /**
   * Creates a log of type error in channel.
   *
   * @param {string} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  error(message, options = {}) {
    options = this.#createOptions(options, {
      formatterConfig: {
        level: 'ERROR',
        chalk: ColorHelper.red,
      },
    })

    message = Logger.#applyLogEngine(message)

    const promises = this.#driver.map(d => d.transport(message, options))

    return Promise.all(promises)
  }

  /**
   * Creates a log of type debug in channel.
   *
   * @param {string} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  debug(message, options = {}) {
    options = this.#createOptions(options, {
      formatterConfig: {
        level: 'DEBUG',
        chalk: ColorHelper.purple,
      },
    })

    message = Logger.#applyLogEngine(message)

    const promises = this.#driver.map(d => d.transport(message, options))

    return Promise.all(promises)
  }

  /**
   * Creates a log of type success in channel.
   *
   * @param {string} message
   * @param {any} [options]
   * @return {void | Promise<void>}
   */
  success(message, options = {}) {
    options = this.#createOptions(options, {
      formatterConfig: {
        level: 'SUCCESS',
        chalk: ColorHelper.green,
      },
    })

    message = Logger.#applyLogEngine(message)

    const promises = this.#driver.map(d => d.transport(message, options))

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

    if (this.runtimeConfig.formatterConfig) {
      formatterConfig = {
        ...this.runtimeConfig.formatterConfig,
        ...formatterConfig,
      }
    }

    options = {
      ...options,
      formatterConfig,
    }

    return options
  }
}
