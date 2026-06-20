import type { MicrosoftClarityDefaults } from './types'

/**
 * Hard-coded Microsoft Clarity defaults. Every value can be overridden through
 * the plugin options.
 */
export const defaults: Required<MicrosoftClarityDefaults> = {
  script: 'https://www.clarity.ms/tag/',
  async: 1,
}
