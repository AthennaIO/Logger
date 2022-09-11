import { Facade } from '@athenna/ioc'

export const Log: Facade & Logger

export class ColorHelper {
  /**
   * Chalk instance.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static chalk: import('chalk').ChalkInstance

  /**
   * Paint as bold.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get bold(): import('chalk').ChalkInstance

  /**
   * Paint as purple.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get purple(): import('chalk').ChalkInstance

  /**
   * Paint as darkPurple.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get darkPurple(): import('chalk').ChalkInstance

  /**
   * Paint as yellow.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get yellow(): import('chalk').ChalkInstance

  /**
   * Paint as cyan.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get cyan(): import('chalk').ChalkInstance

  /**
   * Paint as white.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get white(): import('chalk').ChalkInstance

  /**
   * Paint as orange.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get orange(): import('chalk').ChalkInstance

  /**
   * Paint as green.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get green(): import('chalk').ChalkInstance

  /**
   * Paint as darkGreen.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get darkGreen(): import('chalk').ChalkInstance

  /**
   * Paint as red.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get red(): import('chalk').ChalkInstance

  /**
   * Paint traces.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get trace(): import('chalk').ChalkInstance

  /**
   * Paint debugs.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get debug(): import('chalk').ChalkInstance

  /**
   * Paint infos.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get info(): import('chalk').ChalkInstance

  /**
   * Paint success.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get success(): import('chalk').ChalkInstance

  /**
   * Paint warns.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get warn(): import('chalk').ChalkInstance

  /**
   * Paint errors.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get error(): import('chalk').ChalkInstance

  /**
   * Paint fatals.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get fatal(): import('chalk').ChalkInstance

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get GET(): import('chalk').ChalkInstance

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get HEAD(): import('chalk').ChalkInstance

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get PUT(): import('chalk').ChalkInstance

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get PATCH(): import('chalk').ChalkInstance

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get POST(): import('chalk').ChalkInstance

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get DELETE(): import('chalk').ChalkInstance

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get OPTIONS(): import('chalk').ChalkInstance

  /**
   * Remove all colors and special chars of string.
   *
   * @param {string} string
   * @return {import('chalk').ChalkInstance}
   */
  static removeColors(string: string): import('chalk').ChalkInstance

  /**
   * Paint by the http method.
   *
   * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', 'OPTIONS', 'HEAD' } method
   * @return {import('chalk').ChalkInstance}
   */
  static httpMethod(method: any): import('chalk').ChalkInstance
}

export class FactoryHelper {
  /**
   * Group the configuration values.
   *
   * @param {any} object
   * @param {any} defaultValue
   * @return {any}
   */
  static groupConfigs(object: any, defaultValue: any): any
}

export class DriverFactory {
  /**
   * Drivers of DriverFactory.
   *
   * @type {Map<string, { Driver: any }>}
   */
  static drivers: Map<
    string,
    {
      Driver: any
    }
  >

  /**
   * Return an array with all available drivers.
   *
   * @return {any[]}
   */
  static availableDrivers(): any[]

  /**
   * Fabricate a new instance of a driver based on
   * channel configurations.
   *
   * @param {string} channelName
   * @param {any} runtimeConfig
   * @return {any}
   */
  static fabricate(channelName: string, runtimeConfig?: any): any

  /**
   * Creates a new driver implementation.
   *
   * @param {string} name
   * @param {(channel: string, configs?: any) => any} driver
   */
  static createDriver(
    name: string,
    driver: (channel: string, configs?: any) => any,
  ): void
}

export class FormatterFactory {
  /**
   * Formatters of FormatterFactory.
   *
   * @type {Map<string, { Formatter: any }>}
   */
  static formatters: Map<
    string,
    {
      Formatter: any
    }
  >

  /**
   * Return an array with all available formatters.
   *
   * @return {any[]}
   */
  static availableFormatters(): any[]

  /**
   * Fabricate a new instance of a formatter.
   *
   * @param {string} formatterName
   * @return {any}
   */
  static fabricate(formatterName: string): any

  /**
   * Creates a new formatter implementation.
   *
   * @param {string} name
   * @param {() => any} formatter
   */
  static createFormatter(name: string, formatter: () => any): void
}

export class Logger {
  /**
   * Set runtime configurations for drivers and
   * formatters.
   *
   * @param {any} runtimeConfig
   * @return {Logger}
   */
  config(runtimeConfig: any): Logger

  /**
   * Change the log channel.
   *
   * @param {string[]} channels
   * @return {Logger}
   */
  channel(...channels: string[]): Logger

  /**
   * Creates a log of type trace in channel.
   *
   * @param {string|any} message
   * @return {any | Promise<any>}
   */
  trace(message: string | any): any | Promise<any>

  /**
   * Creates a log of type trace in channel.
   *
   * @param {string[]|any[]} args
   * @return {any | Promise<any>}
   */
  trace(...args: string[] | any[]): any | Promise<any>

  /**
   * Creates a log of type debug in channel.
   *
   * @param {string|any} message
   * @return {any | Promise<any>}
   */
  debug(message: string | any): any | Promise<any>

  /**
   * Creates a log of type debug in channel.
   *
   * @param {string[]|any[]} args
   * @return {any | Promise<any>}
   */
  debug(...args: string[] | any[]): any | Promise<any>

  /**
   * Creates a log of type info in channel.
   *
   * @param {string|any} message
   * @return {any | Promise<any>}
   */
  info(message: string | any): any | Promise<any>

  /**
   * Creates a log of type info in channel.
   *
   * @param {string[]|any[]} args
   * @return {any | Promise<any>}
   */
  info(...args: string[] | any[]): any | Promise<any>

  /**
   * Creates a log of type success in channel.
   *
   * @param {string|any} message
   * @return {any | Promise<any>}
   */
  success(message: string | any): any | Promise<any>

  /**
   * Creates a log of type success in channel.
   *
   * @param {string[]|any[]} args
   * @return {any | Promise<any>}
   */
  success(...args: string[] | any[]): any | Promise<any>

  /**
   * Creates a log of type warn in channel.
   *
   * @param {string|any} message
   * @return {any | Promise<any>}
   */
  warn(message: string | any): any | Promise<any>

  /**
   * Creates a log of type warn in channel.
   *
   * @param {string[]|any[]} args
   * @return {any | Promise<any>}
   */
  warn(...args: string[] | any[]): any | Promise<any>

  /**
   * Creates a log of type error in channel.
   *
   * @param {string|any} message
   * @return {any | Promise<any>}
   */
  error(message: string | any): any | Promise<any>

  /**
   * Creates a log of type error in channel.
   *
   * @param {string[]|any[]} args
   * @return {any | Promise<any>}
   */
  error(...args: string[] | any[]): any | Promise<any>
}
