import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: Function
  }
}

type GAConfiguration = {
  send_page_view?: boolean
  allow_google_signals?: boolean
  allow_ad_personalization_signals?: boolean
  cookie_domain?: string
  cookie_expires?: number
  cookie_prefix?: string
  cookie_update?: boolean
  cookie_flags?: string
}

type GoogleAnaliticsProperty = {
  id: string
  disable?: boolean
  config?: GAConfiguration
  persistentValues?: Record<string, string | number | boolean>
}

export type GoogleAnaliticsOptions = GoogleAnaliticsProperty | GoogleAnaliticsProperty[]

const GTagBase = 'https://www.googletagmanager.com/gtag/js'

function injectTag(options: GoogleAnaliticsOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const properties: GoogleAnaliticsProperty[] = []

  if (Array.isArray(options)) {
    properties.push(
      ...options,
    )
  }
  else {
    properties.push(options)
  }

  if (!properties.length)
    return tags

  const mainProperty = properties.shift()

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
      src: `${GTagBase}?id=${mainProperty.id}`,
      async: true,
    },
  })

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
