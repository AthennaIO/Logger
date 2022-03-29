/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Exception } from '@secjs/utils'

export class ChannelNotConfiguredException extends Exception {
  public constructor(channelName: string) {
    const content = `Channel ${channelName} is not configured inside logging.channels object from config/logging file`

    super(
      content,
      500,
      'NOT_CONFIGURED_ERROR',
      `Implement the channel in the logging.channels`,
    )
  }
}
