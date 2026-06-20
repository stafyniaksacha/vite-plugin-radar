import type { UnbounceDefaults } from './types'

/**
 * Hard-coded Unbounce defaults. Every value can be overridden through the
 * plugin options.
 *
 * @see https://gist.github.com/unbounce/705431#file-unbounce-external-tracking-html
 */
export const defaults: Required<UnbounceDefaults> = {
  script: 'd3pkntwtp2ukl5.cloudfront.net/uba.js',
  goal: '["trackGoal", "convert"]',
}
