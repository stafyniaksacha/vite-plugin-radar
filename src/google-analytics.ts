import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: Function
  }
}

interface GAConfiguration {
  send_page_view?: boolean
  allow_google_signals?: boolean
  allow_ad_personalization_signals?: boolean
  transport_url?: string
  cookie_domain?: string
  cookie_expires?: number
  cookie_prefix?: string
  cookie_update?: boolean
  cookie_flags?: string
}

interface GAConsentDefaults {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
  wait_for_update?: number
}

type GoogleAnaliticsMainProperty = GoogleAnaliticsProperty & {
  consentDefaults?: GAConsentDefaults
  injectTo?: HtmlTagDescriptor['injectTo']
}

interface GoogleAnaliticsProperty {
  id: string
  source?: string
  disable?: boolean
  config?: GAConfiguration
  persistentValues?: Record<string, string | number | boolean>
}

export type GoogleAnaliticsOptions = GoogleAnaliticsMainProperty | [GoogleAnaliticsMainProperty, ...GoogleAnaliticsProperty[]]

const GTagSource = 'https://www.googletagmanager.com'
const GTagBase = (source: string) => `${source}/gtag/js`

function injectTag(options: GoogleAnaliticsOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  let properties: GoogleAnaliticsProperty[] = []

  if (Array.isArray(options)) {
    properties.push(
      ...options,
    )
  }
  else {
    properties.push(options)
  }

  properties = properties.filter(property => Boolean(property.id))

  if (!properties.length)
    return tags

  const mainProperty = properties.shift() as GoogleAnaliticsMainProperty

  if (!mainProperty)
    return tags

  /// https://developers.google.com/analytics/devguides/collection/ga4

  let template = ''

  // disable properties if needed
  if (mainProperty.disable)
    template += `window['ga-disable-${mainProperty.id}'] = true;\n`

  for (const property of properties) {
    if (property.disable)
      template += `window['ga-disable-${property.id}'] = true;\n`
  }

  // inject dataLayer & gtag function to window object
  template += 'window.dataLayer = window.dataLayer || [];\n'
  template += 'function gtag(){dataLayer.push(arguments);}\n'

  // tag user time
  template += 'gtag(\'js\', new Date());\n'

  // register default values for "consent mode"
  // must be before config calls
  if (mainProperty.consentDefaults)
    template += `gtag('consent', 'default', ${JSON.stringify(mainProperty.consentDefaults)});\n`

  // register property config
  for (const property of [mainProperty, ...properties]) {
    if (property.config || property.persistentValues) {
      const config: Record<string, string | number | boolean> = Object.assign(
        {},
        property.persistentValues,
        property.config,
      )

      template += `gtag('config', '${property.id}', ${JSON.stringify(config)});\n`
    }
    else {
      template += `gtag('config', '${property.id}');\n`
    }
  }

  tags.push({
    tag: 'script',
    attrs: {
      src: `${GTagBase(mainProperty?.source || GTagSource)}?id=${mainProperty.id}`,
      async: true,
    },
    injectTo: mainProperty.injectTo,
  })

  tags.push({
    tag: 'script',
    children: template,
    injectTo: mainProperty.injectTo,
  })

  return tags
}
export default injectTag
