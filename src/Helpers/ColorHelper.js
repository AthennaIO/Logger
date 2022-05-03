/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import chalk from 'chalk'

export class ColorHelper {
  /**
   * Chalk instance.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static chalk = chalk

  /**
   * Paint as bold.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get bold() {
    return ColorHelper.chalk.bold
  }

  /**
   * Paint as purple.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get purple() {
    return ColorHelper.chalk.hex('#7628c8')
  }

  /**
   * Paint as darkPurple.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get darkPurple() {
    return ColorHelper.chalk.hex('#501b86')
  }

  /**
   * Paint as yellow.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get yellow() {
    return ColorHelper.chalk.hex('#ffe600')
  }

  /**
   * Paint as cyan.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get cyan() {
    return ColorHelper.chalk.hex('#00ffff')
  }

  /**
   * Paint as white.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get white() {
    return ColorHelper.chalk.hex('#ffffff')
  }

  /**
   * Paint as orange.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get orange() {
    return ColorHelper.chalk.hex('#f18b0e')
  }

  /**
   * Paint as green.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get green() {
    return ColorHelper.chalk.hex('#0ef12c')
  }

  /**
   * Paint as darkGreen.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get darkGreen() {
    return ColorHelper.chalk.hex('#1cb70b')
  }

  /**
   * Paint as red.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get red() {
    return ColorHelper.chalk.hex('#f10e0e')
  }

  /**
   * Paint as darkRed.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get darkRed() {
    return ColorHelper.chalk.hex('#710909')
  }

  /**
   * Paint infos.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get info() {
    return this.cyan.bold
  }

  /**
   * Paint debugs.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get debug() {
    return this.purple.bold
  }

  /**
   * Paint error.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get error() {
    return this.red.bold
  }

  /**
   * Paint critical.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get critical() {
    return this.darkRed.bold
  }

  /**
   * Paint warning.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get warning() {
    return this.orange.bold
  }

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get GET() {
    return this.purple.bold
  }

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get HEAD() {
    return this.cyan.bold
  }

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get PUT() {
    return this.orange.bold
  }

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get PATCH() {
    return this.yellow.bold
  }

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get POST() {
    return this.green.bold
  }

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get DELETE() {
    return this.red.bold
  }

  /**
   * Paint http method.
   *
   * @return {import('chalk').ChalkInstance}
   */
  static get OPTIONS() {
    return this.cyan.bold
  }

  /**
   * Remove all colors and special chars of string.
   *
   * @param {string} string
   * @return {import('chalk').ChalkInstance}
   */
  static removeColors(string) {
    return ColorHelper.chalk.reset(string).replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      '',
    )
  }

  /**
   * Paint by the http method.
   *
   * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', 'OPTIONS', 'HEAD' } method
   * @return {import('chalk').ChalkInstance}
   */
  static httpMethod(method) {
    return this[method]
  }
}
