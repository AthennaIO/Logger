/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config, Exception } from '@secjs/utils'

export class NotImplementedConfigException extends Exception {
  /**
   * Creates a new instance of NotImplementedConfigException.
   *
   * @param {string} channelName
   * @return {NotImplementedConfigException}
   */
  constructor(channelName) {
    const content = `Channel ${channelName} is not configured inside logging.channels object from config/logging file.`

    let help = ''

    if (Config.get('logging.channels')) {
      const availableConfigs = Object.keys(Config.get('logging.channels')).join(
        ', ',
      )

      help += `Available configurations are: ${availableConfigs}.`
    } else {
      help += `The "Config.get('logging.channels') is empty, maybe your configuration files are not loaded?`
    }

    help += ` Create your configuration inside channels object to use it. Or load your configuration files using "new Config().safeLoad(Path.config('logging.js'))`

    super(content, 500, 'E_NOT_IMPLEMENTED_CONFIG_ERROR', help)
  }
}
