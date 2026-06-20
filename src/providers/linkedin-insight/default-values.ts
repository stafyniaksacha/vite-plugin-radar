import type { LinkedinInsightDefaults } from './types'

/**
 * Hard-coded LinkedIn Insight defaults. Every value can be overridden per
 * property through the plugin options.
 *
 * @see https://www.linkedin.com/help/lms/answer/a427660
 */
export const defaults: Required<LinkedinInsightDefaults> = {
  script: 'https://snap.licdn.com/li.lms-analytics/insight.min.js',
  noScript: 'https://px.ads.linkedin.com/collect/',
  async: true,
}
