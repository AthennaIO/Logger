/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path, Exception } from '@athenna/common'

export class NotImplementedConfigException extends Exception {
  /**
   * Creates a new instance of NotImplementedConfigException.
   *
   * @param {string} channelName
   * @param {any[]} channels
   * @return {NotImplementedConfigException}
   */
  constructor(channelName, channels) {
    const content = `Channel ${channelName} is not configured inside logging.channels object from config/logging.${Path.ext()} file.`

    let help = ''

    if (channels && channels.length) {
      const availableConfigs = Object.keys(channels).join(', ')

      help += `Available configurations are: ${availableConfigs}.`
    } else {
      help += `The "Config.get('logging.channels')" is empty, maybe your configuration files are not loaded?`
    }

    help += ` Create your configuration inside channels object to use it. Or load your configuration files using "Config.safeLoad(Path.config('logging.${Path.ext()}'))`

    super(content, 500, 'E_NOT_IMPLEMENTED_CONFIG_ERROR', help)
  }
}
