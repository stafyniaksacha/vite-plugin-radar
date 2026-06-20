import type { HtmlTagDescriptor } from 'vite'
import type { GoogleAnaliticsMainProperty, GoogleAnaliticsOptions, GoogleAnaliticsProperty } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (command: string, ...args: any[]) => void
  }
}

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

  const mainProperty = { ...defaults, ...(properties.shift() as GoogleAnaliticsMainProperty) }

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

  // inject dataLayer & gtag function to window object and tag user time
  template += mainProperty.loader

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
      src: `${mainProperty.source}${mainProperty.basePath}?id=${mainProperty.id}`,
      async: mainProperty.async,
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
