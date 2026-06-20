import type { GoogleAnaliticsDefaults } from './types'

/**
 * Hard-coded Google Analytics defaults. Every value can be overridden on the
 * main property through the plugin options.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */
export const defaults: Required<GoogleAnaliticsDefaults> = {
  source: 'https://www.googletagmanager.com',
  basePath: '/gtag/js',
  async: true,
  loader: 'window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag(\'js\', new Date());\n',
}
