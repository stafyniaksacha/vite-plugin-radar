import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

type GoogleTagManagerProperty = {
  id: string
}

export type GoogleTagManagerOptions = GoogleTagManagerProperty | GoogleTagManagerProperty[]

const GTMBase = 'https://www.googletagmanager.com/gtm.js'
const NSBase = 'https://www.googletagmanager.com/ns.html'

/// https://developers.google.com/tag-manager/quickstart
function injectTag(options: GoogleTagManagerOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  let properties: GoogleTagManagerProperty[] = []

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

  for (const property of properties) {
    tags.push({
      tag: 'script',
      attrs: {
        src: `${GTMBase}?id=${property.id}`,
        async: true,
      },
    })
    tags.push({
      tag: 'noscript',
      injectTo: 'body-prepend',
      children: `<iframe src="${NSBase}?id=${property.id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
    })
  }

  return tags
}
export default injectTag
