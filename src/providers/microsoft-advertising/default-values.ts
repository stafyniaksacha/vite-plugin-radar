import type { MicrosoftAdvertisingDefaults } from './types'

/**
 * Hard-coded Microsoft Advertising (UET) defaults. Every value can be
 * overridden through the plugin options.
 *
 * @see https://help.ads.microsoft.com/#apex/ads/en/ext60065/
 */
export const defaults: Required<MicrosoftAdvertisingDefaults> = {
  script: '//bat.bing.com/bat.js',
  async: 1,
}
