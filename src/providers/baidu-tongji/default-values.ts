import type { BaiduTongjiDefaults } from './types'

/**
 * Hard-coded Baidu Tongji defaults. Every value can be overridden per property
 * through the plugin options.
 *
 * @see https://tongji.baidu.com/open/api/more
 */
export const defaults: Required<BaiduTongjiDefaults> = {
  script: 'https://hm.baidu.com/hm.js',
  async: true,
  autoPageview: true,
}
