import type { GoogleTagManagerDefaults } from './types'

/**
 * Hard-coded Google Tag Manager defaults. Every value can be overridden per
 * property through the plugin options.
 *
 * @see https://developers.google.com/tag-manager/quickstart
 */
export const defaults: Required<GoogleTagManagerDefaults> = {
  gtmBase: 'https://www.googletagmanager.com/gtm.js',
  nsBase: 'https://www.googletagmanager.com/ns.html',
  async: true,
  loader: 'window.dataLayer = window.dataLayer || [];\nwindow.dataLayer.push({\'gtm.start\': new Date().getTime(),event:\'gtm.js\'});\n',
}
