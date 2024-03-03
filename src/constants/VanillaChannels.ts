/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path } from '@athenna/common'

/**
 * Athenna default vanilla channels. This configuration
 * will be used by the "channelOrVanilla" method. If the
 * configuration does not exist, then the vanilla will be set.
 */
export const VANILLA_CHANNELS = {
  default: {
    driver: 'stack',
    channels: ['application']
  },
  stack: {
    driver: 'stack',
    channels: ['application']
  },
  discard: {
    driver: 'null'
  },
  file: {
    driver: 'file',
    level: 'trace',
    filePath: Path.logs('athenna.log'),

    formatter: 'simple',
    formatterConfig: {}
  },
  console: {
    level: 'trace',
    formatter: 'cli',
    driver: 'console'
  },
  lambda: {
    level: 'trace',
    formatter: 'json',
    driver: 'lambda'
  },
  request: {
    level: 'trace',
    formatter: 'request',
    driver: 'console'
  },
  exception: {
    level: 'trace',
    formatter: 'none',
    driver: 'console',
    streamType: 'stderr'
  },
  application: {
    level: 'trace',
    driver: 'console',
    formatter: 'simple'
  }
}
