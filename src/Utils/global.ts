/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Log as LogFunction } from 'src/Log'
import { Logger as LoggerClass } from 'src/Logger'

const _global = global as any

_global.Log = LogFunction
_global.Logger = LoggerClass

export {}

declare global {
  const Log: typeof LogFunction
  const Logger: typeof LoggerClass
}
