import type { HotjarDefaults } from './types'

/**
 * Hard-coded Hotjar defaults. Every value can be overridden through the plugin
 * options.
 *
 * @see https://help.hotjar.com/hc/en-us/articles/115009336727
 */
export const defaults: Required<HotjarDefaults> = {
  script: 'https://static.hotjar.com/c/hotjar-',
  version: 6,
  async: 1,
}
