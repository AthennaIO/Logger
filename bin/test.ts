/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Path } from '@athenna/common'
import { Runner } from '@athenna/test'
import { EnvHelper } from '@athenna/config'

EnvHelper.resolveFilePath(Path.pwd('.env'))

await Runner.setTsEnv()
  .addAssertPlugin()
  .addPath('tests/unit/**/*.ts')
  .setCliArgs(process.argv.slice(2))
  .setGlobalTimeout(30000)
  .run()
