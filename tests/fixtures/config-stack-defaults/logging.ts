/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default {
  default: 'stack',
  channels: {
    stack: {
      driver: 'stack',
      channels: ['simple']
    },
    simple: {
      driver: 'console',
      formatter: 'json',
      level: 'trace'
    }
  }
}
