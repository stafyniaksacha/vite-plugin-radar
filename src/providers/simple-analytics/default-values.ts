import type { SimpleAnalyticsDefaults } from './types'

/**
 * Hard-coded Simple Analytics defaults. Every value can be overridden through
 * the plugin options.
 *
 * @see https://docs.simpleanalytics.com/script
 */
export const defaults: Required<SimpleAnalyticsDefaults> = {
  script: 'https://scripts.simpleanalyticscdn.com/latest.js',
  noScript: 'https://queue.simpleanalyticscdn.com/noscript.gif',
  async: true,
  defer: true,
}
