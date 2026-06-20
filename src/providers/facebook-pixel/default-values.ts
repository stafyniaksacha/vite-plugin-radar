import type { FacebookPixelDefaults } from './types'

/**
 * Hard-coded Facebook Pixel defaults. Every value can be overridden per
 * property through the plugin options.
 *
 * @see https://developers.facebook.com/docs/facebook-pixel/implementation
 */
export const defaults: Required<FacebookPixelDefaults> = {
  script: 'https://connect.facebook.net/en_US/fbevents.js',
  noScript: 'https://www.facebook.com/tr',
  event: 'PageView',
}
