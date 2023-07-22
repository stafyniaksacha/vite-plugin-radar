import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

interface GoogleTagManagerMainProperty {
  id: string
}

interface GoogleTagManagerDefaultProperty {
  gtmBase?: string
  nsBase?: string
  environment?: GoogleTagManagerEnvironment
}

interface GoogleTagManagerEnvironment {
  auth: string
  preview: string
}

type GoogleTagManagerProperty = GoogleTagManagerMainProperty & GoogleTagManagerDefaultProperty

export type GoogleTagManagerOptions = GoogleTagManagerProperty | GoogleTagManagerProperty[]

const defaultOptions: GoogleTagManagerDefaultProperty = {
  gtmBase: 'https://www.googletagmanager.com/gtm.js',
  nsBase: 'https://www.googletagmanager.com/ns.html',
}

/// https://developers.google.com/tag-manager/quickstart
function injectTag(options: GoogleTagManagerOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  let properties: GoogleTagManagerProperty[] = []

  if (Array.isArray(options)) {
    properties.push(
      ...options.map(options => ({
        ...defaultOptions,
        ...options,
      })),
    )
  }
  else {
    properties.push({
      ...defaultOptions,
      ...options,
    })
  }

  properties = properties.filter(property => Boolean(property.id))

  if (!properties.length)
    return tags

  let template = ''

  // inject dataLayer tp window object
  template += 'window.dataLayer = window.dataLayer || [];\n'

  // tag gtm.start event
  template += 'window.dataLayer.push({'
  template += '\'gtm.start\': new Date().getTime(),'
  template += 'event:\'gtm.js\''
  template += '});\n'

  tags.push({
    tag: 'script',
    children: template,
  })

  const environmentAttachment = property.environment ? `&gtm_auth=${property.environment.auth}&gtm_preview=${property.environment.preview}` : "";
    
  for (const property of properties) {
    tags.push({
      tag: 'script',
      attrs: {
        src: `${property.gtmBase}?id=${property.id}${environmentAttachment}`,
        async: true,
      },
    })
    tags.push({
      tag: 'noscript',
      injectTo: 'body-prepend',
      children: `<iframe src="${property.nsBase}?id=${property.id}${environmentAttachment}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    })
  }

  return tags
}
export default injectTag
