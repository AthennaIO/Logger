/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { Context } from '@opentelemetry/api'

export type ContextBinding = {
  field: string
  resolver: (activeContext: Context) => any
}
