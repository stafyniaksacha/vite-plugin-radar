import type { VKRetargetingDefaults } from './types'

/**
 * Hard-coded VK Retargeting defaults. Every value can be overridden per
 * property through the plugin options.
 *
 * @see https://vk.com/faq14080
 */
export const defaults: Required<VKRetargetingDefaults> = {
  script: 'https://vk.com/js/api/openapi.js?169',
  noScript: 'https://vk.com/rtrg',
  hit: 'VK.Retargeting.Hit()',
}
