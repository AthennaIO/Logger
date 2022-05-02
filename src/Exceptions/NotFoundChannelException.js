/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config, Exception } from '@secjs/utils'

export class NotFoundChannelException extends Exception {
  /**
   * Creates a new instance of NotFoundChannelException.
   *
   * @param {string} channelName
   * @return {NotFoundChannelException}
   */
  constructor(channelName) {
    const content = `Channel ${channelName} not found.`
    const availableChannels = Object.keys(Config.get('logging.channels')).join(
      ', ',
    )

    super(
      content,
      500,
      'E_NOT_FOUND',
      `Available channels are: ${availableChannels}. Look into your config/logger file if ${channelName} channel is inside "channels" property, if it does not exist create ${channelName} channel object inside "channels".`,
    )
  }
}
