/**
 * @athenna/logger
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export function groupConfigs<T = any>(main: any, fallback: any): Required<T> {
  const formatter = main.formatter || fallback.formatter
  const formatterConfig = Object.assign(
    {},
    fallback.formatterConfig,
    main.formatterConfig,
  )

  const driverConfig = Object.assign({}, fallback, main)

  return { ...driverConfig, formatter, formatterConfig }
}
