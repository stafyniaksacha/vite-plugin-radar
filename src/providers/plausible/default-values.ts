import type { PlausibleAnalyticsDefaults } from './types'

/**
 * Hard-coded Plausible defaults. Every value can be overridden through the
 * plugin options.
 *
 * @see https://plausible.io/docs/plausible-script
 */
export const defaults: Required<PlausibleAnalyticsDefaults> = {
  script: 'https://plausible.io/js/script.js',
  defer: true,
}
