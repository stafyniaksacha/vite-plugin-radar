import type { TikTokPixelDefaults } from './types'

/**
 * Hard-coded TikTok Pixel defaults. Every value can be overridden through the
 * plugin options.
 */
export const defaults: Required<TikTokPixelDefaults> = {
  script: 'analytics.tiktok.com/i18n/pixel/events.js',
  methods: ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'],
  page: 'ttq.page()',
}
