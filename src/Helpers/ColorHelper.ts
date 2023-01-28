/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { format } from 'node:util'
import { Is } from '@athenna/common'
import { Chalk, ChalkInstance } from 'chalk'

export class ColorHelper {
  /**
   * Chalk instance.
   */
  public static chalk = new Chalk()

  /**
   * Paint as bold.
   */
  static get bold(): ChalkInstance {
    return ColorHelper.chalk.bold
  }

  /**
   * Paint as grey.
   */
  static get grey(): ChalkInstance {
    return ColorHelper.chalk.hex('#505050')
  }

  /**
   * Paint as purple.
   */
  static get purple(): ChalkInstance {
    return ColorHelper.chalk.hex('#7628c8')
  }

  /**
   * Paint as darkPurple.
   */
  static get darkPurple(): ChalkInstance {
    return ColorHelper.chalk.hex('#501b86')
  }

  /**
   * Paint as yellow.
   */
  static get yellow(): ChalkInstance {
    return ColorHelper.chalk.hex('#ffe600')
  }

  /**
   * Paint as cyan.
   */
  static get cyan(): ChalkInstance {
    return ColorHelper.chalk.hex('#00ffff')
  }

  /**
   * Paint as white.
   */
  static get white(): ChalkInstance {
    return ColorHelper.chalk.hex('#ffffff')
  }

  /**
   * Paint as orange.
   */
  static get orange(): ChalkInstance {
    return ColorHelper.chalk.hex('#f18b0e')
  }

  /**
   * Paint as green.
   */
  static get green(): ChalkInstance {
    return ColorHelper.chalk.hex('#0ef12c')
  }

  /**
   * Paint as darkGreen.
   */
  static get darkGreen(): ChalkInstance {
    return ColorHelper.chalk.hex('#1cb70b')
  }

  /**
   * Paint as red.
   */
  static get red(): ChalkInstance {
    return ColorHelper.chalk.hex('#f10e0e')
  }

  /**
   * Paint as darkRed.
   */
  static get darkRed(): ChalkInstance {
    return ColorHelper.chalk.hex('#710909')
  }

  /**
   * Paint debugs.
   */
  static get trace(): ChalkInstance {
    return this.grey.bold
  }

  /**
   * Paint debugs.
   */
  static get debug(): ChalkInstance {
    return this.purple.bold
  }

  /**
   * Paint infos.
   */
  static get info(): ChalkInstance {
    return this.cyan
  }

  /**
   * Paint success.
   */
  static get success(): ChalkInstance {
    return this.green
  }

  /**
   * Paint warning.
   */
  static get warn(): ChalkInstance {
    return this.orange
  }

  /**
   * Paint error.
   */
  static get error(): ChalkInstance {
    return this.red
  }

  /**
   * Paint fatal.
   */
  static get fatal(): ChalkInstance {
    return ColorHelper.chalk.bgRed
  }

  /**
   * Paint http method.
   */
  static get GET(): ChalkInstance {
    return this.purple.bold
  }

  /**
   * Paint http method.
   */
  static get HEAD(): ChalkInstance {
    return this.cyan.bold
  }

  /**
   * Paint http method.
   */
  static get PUT(): ChalkInstance {
    return this.orange.bold
  }

  /**
   * Paint http method.
   */
  static get PATCH(): ChalkInstance {
    return this.yellow.bold
  }

  /**
   * Paint http method.
   */
  static get POST(): ChalkInstance {
    return this.green.bold
  }

  /**
   * Paint http method.
   */
  static get DELETE(): ChalkInstance {
    return this.red.bold
  }

  /**
   * Paint http method.
   */
  static get OPTIONS(): ChalkInstance {
    return this.cyan.bold
  }

  /**
   * Remove all colors and special chars of string.
   */
  public static removeColors(value: string): string {
    return ColorHelper.chalk.reset(value).replace(
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      '',
    )
  }

  /**
   * Paint by the http method.
   */
  public static httpMethod(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD',
  ): ChalkInstance {
    return this[method]
  }

  /**
   * Applies the log engine to execute chalk methods.
   */
  public static applyLogEngine(...args: string[]): any {
    if (!Is.String(args[0])) {
      return args[0]
    }

    let content = format(...args.filter(arg => arg !== undefined))

    const matches = content.match(/\({(.*?)} ([\s\S]*?)\)/g)

    if (!matches) {
      return content
    }

    matches.forEach(match => {
      const [chalkMethodsInBrackets, chalkMethodsString] = match.match(
        /\{(.*?)\}/,
      ) as any

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
