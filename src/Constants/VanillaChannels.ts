/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Athenna default vanilla channels. This configurations
 * will be used by the "channelOrVanilla" method. If the
 * configuration does not exist, than the vanilla will be set.
 */
export const VANILLA_CHANNELS = {
  default: {
    driver: 'stack',
    channels: ['application'],
  },
  stack: {
    driver: 'stack',
    channels: ['application'],
  },
  discard: {
    driver: 'null',
  },
  console: {
    level: 'trace',
    formatter: 'cli',
    driver: 'console',
  },
  exception: {
    level: 'trace',
    formatter: 'none',
    driver: 'console',
    streamType: 'stderr',
  },
  application: {
    level: 'trace',
    driver: 'console',
    formatter: 'simple',
  },
}
