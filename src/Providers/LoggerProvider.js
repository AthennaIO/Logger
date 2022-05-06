/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Logger } from '#src/index'
import { ServiceProvider } from '@athenna/ioc'

export class LoggerProvider extends ServiceProvider {
  /**
   * Register any application services.
   *
   * @return {void}
   */
  register() {
    this.container.bind('Athenna/Core/Logger', Logger, false)
  }
}
