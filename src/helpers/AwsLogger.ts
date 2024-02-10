/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Logger } from '@aws-lambda-powertools/logger'

/**
 * Expose the AWS logger to be able to make changes on it.
 * By default the log level is set to `debug` because the
 * responsible of deciding if the message should be logged
 * or not is from Athenna.
 */
export const logger = new Logger({ logLevel: 'debug' })
