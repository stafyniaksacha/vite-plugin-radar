import type { HtmlTagDescriptor } from 'vite'
import type { GoogleTagManagerOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

/// https://developers.google.com/tag-manager/quickstart
function injectTag(options: GoogleTagManagerOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  const properties = (Array.isArray(options) ? options : [options])
    .map(property => ({ ...defaults, ...property }))
    .filter(property => Boolean(property.id))

  if (!properties.length)
    return tags

  let template = ''

  // inject dataLayer to window object and tag the gtm.start event
  template += properties[0].loader

  tags.push({
    tag: 'script',
    children: template,
  })

  for (const property of properties) {
    const environmentAttachment = property.environment ? `&gtm_auth=${property.environment.auth}&gtm_preview=${property.environment.preview}` : ''

    tags.push({
      tag: 'script',
      attrs: {
        src: `${property.gtmBase}?id=${property.id}${environmentAttachment}`,
        async: property.async,
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
