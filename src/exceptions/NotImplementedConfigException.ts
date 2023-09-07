/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path, Exception, Is } from '@athenna/common'

export class NotImplementedConfigException extends Exception {
  constructor(channelName: string) {
    let help = ''

    const channels = Config.get('logging.channels')

    if (channels && !Is.Empty(channels)) {
      const availableConfigs = Object.keys(channels).join(', ')

      help += `Available configurations are: ${availableConfigs}.`
    } else {
      help += `The "Config.get('logging.channels')" is empty, maybe your configuration files are not loaded?`
    }

    help += ` Create your configuration inside channels object to use it. Or load your configuration files using "Config.safeLoad(Path.config('logging.${Path.ext()}'))`

    super({
      status: 500,
      code: 'E_NOT_IMPLEMENTED_CONFIG_ERROR',
      message: `Channel ${channelName} is not configured inside logging.channels object from config/logging.${Path.ext()} file.`,
      help
    })
  }
}
