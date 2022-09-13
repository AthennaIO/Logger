/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import axios from 'axios'

import { Driver } from '#src/Drivers/Driver'

export class DiscordDriver extends Driver {
  /**
   * Creates a new instance of DiscordDriver.
   *
   * @param {any} configs
   * @return {DiscordDriver}
   */
  constructor(configs) {
    super(configs)
  }

  /**
   * Transport the log.
   *
   * @param {string} level
   * @param {string} message
   * @return {Promise<any>}
   */
  async transport(level, message) {
    if (!this.couldBeTransported(level)) {
      return
    }

    const formatted = this.format(level, message, true)

    return axios.post(this.configs.url, {
      username: this.configs.username,
      content: formatted,
    })
  }
}
