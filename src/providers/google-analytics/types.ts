import type { HtmlTagDescriptor } from 'vite'

export interface GAConfiguration extends Record<string, any> {
  send_page_view?: boolean
  allow_google_signals?: boolean
  allow_ad_personalization_signals?: boolean
  transport_url?: string
  cookie_domain?: string
  cookie_expires?: number
  cookie_prefix?: string
  cookie_update?: boolean
  cookie_flags?: string
  user_id?: string
  page_title?: string
  currency?: string
  debug_mode?: boolean
}

export interface GAConsentDefaults {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
  wait_for_update?: number
}

export type GoogleAnaliticsMainProperty = GoogleAnaliticsProperty & {
  consentDefaults?: GAConsentDefaults
  injectTo?: HtmlTagDescriptor['injectTo']
}

export interface GoogleAnaliticsProperty {
  id: string
  source?: string
  disable?: boolean
  config?: GAConfiguration
  persistentValues?: Record<string, string | number | boolean>
}

export type GoogleAnaliticsOptions = GoogleAnaliticsMainProperty | [GoogleAnaliticsMainProperty, ...GoogleAnaliticsProperty[]]
