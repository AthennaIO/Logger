import { Chalk } from 'chalk'
import { Is } from '@secjs/utils'
import { format } from 'node:util'

import { DriverFactory } from '#src/Factories/DriverFactory'

export * from './Facades/Log.js'

export * from './Helpers/ColorHelper.js'
export * from './Helpers/FactoryHelper.js'

export * from './Drivers/Driver.js'
export * from './Formatters/Formatter.js'

export * from './Factories/DriverFactory.js'
export * from './Factories/FormatterFactory.js'

export class Logger {
  /**
   * The driver responsible for transporting the logs.
   *
   * @type {any[]}
   */
  #drivers = []

  /**
   * Runtime configurations to be used inside the Drivers and Formatters.
   *
   * @type {any}
   */
  #runtimeConfigs = {}

  /**
   * Creates a new instance of Logger.
   *
   * @return {Logger}
   */
  constructor() {
    this.#drivers.push(DriverFactory.fabricate('default', this.#runtimeConfigs))
  }

  /**
   * Set runtime configurations for drivers and
   * formatters.
   *
   * @param {any} runtimeConfigs
   * @return {Logger}
   */
  config(runtimeConfigs) {
    this.#runtimeConfigs = runtimeConfigs

    return this
  }

  /**
   * Change the log channel.
   *
   * @param {string} channels
   * @return {Logger}
   */
  channel(...channels) {
    this.#drivers = []

    channels.forEach(c => {
      this.#drivers.push(DriverFactory.fabricate(c, this.#runtimeConfigs))
    })

    return this
  }

  /**
   * Call drivers to transport the log.
   *
   * @param {string} level
   * @param {string} args
   * @return {any | Promise<any>}
   */
  #log(level, ...args) {
    const message = this.#applyEngine(...args)

    const promises = this.#drivers.map(d => d.transport(level, message))

    return Promise.all(promises)
  }

  /**
   * Creates a log of type trace in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  trace(...args) {
    return this.#log('trace', ...args)
  }

  /**
   * Creates a log of type debug in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  debug(...args) {
    return this.#log('debug', ...args)
  }

  /**
   * Creates a log of type info in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  info(...args) {
    return this.#log('info', ...args)
  }

  /**
   * Creates a log of type success in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  success(...args) {
    return this.#log('success', ...args)
  }

  /**
   * Creates a log of type warn in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  warn(...args) {
    return this.#log('warn', ...args)
  }

  /**
   * Creates a log of type error in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  error(...args) {
    return this.#log('error', ...args)
  }

  /**
   * Creates a log of type fatal in channel.
   *
   * @param {string|any} args
   * @return {any | Promise<any>}
   */
  fatal(...args) {
    return this.#log('fatal', ...args)
  }

  /**
   * Applies the log engine to execute chalk methods.
   *
   * @param {string} args
   * @return {any}
   */
  #applyEngine(...args) {
    if (!Is.String(args[0])) {
      return args[0]
    }

    let content = format(...args.filter(arg => arg !== undefined))

    const matches = content.match(/\({(.*?)} (.*?)\)/g)

    if (!matches) {
      return content
    }

    matches.forEach(match => {
      const [chalkMethodsInBrackets, chalkMethodsString] =
        match.match(/\{(.*?)\}/)

      const message = match
        .replace(chalkMethodsInBrackets, '')
        .replace(/\s*\(\s*|\s*\)\s*/g, '')

      const chalkMethodsArray = chalkMethodsString.replace(/\s/g, '').split(',')

      let chalk = new Chalk()

      chalkMethodsArray.forEach(chalkMethod => {
        if (!chalk[chalkMethod]) return

        chalk = chalk[chalkMethod]
      })

      content = content.replace(match, chalk(message))
    })

    return content
  }
}
