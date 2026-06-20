import type { YandexMetricaDefaults } from './types'

/**
 * Hard-coded Yandex Metrica defaults. Every value can be overridden per
 * property through the plugin options.
 *
 * @see https://yandex.com/support/metrica/quick-start.html
 */
export const defaults: Required<YandexMetricaDefaults> = {
  script: 'https://mc.yandex.ru/metrika/tag.js',
  noScript: 'https://mc.yandex.ru/watch/',
}
