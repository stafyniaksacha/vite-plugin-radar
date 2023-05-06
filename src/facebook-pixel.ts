import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    fbq: Function
  }
}

export interface FacebookPixel {
  /**
   * Pixel tag
   */
  id: string
}

export type FacebookPixelOption = FacebookPixel | FacebookPixel[]

const PixelBase = 'https://connect.facebook.net/en_US/fbevents.js'
const NoScriptBase = 'https://www.facebook.com/tr'

function injectTag(options: FacebookPixelOption): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  let properties: FacebookPixel[] = []

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

  /// https://developers.facebook.com/docs/facebook-pixel/implementation
  let template = ''
  let noscriptTemplate = ''

  template += '!function(f,b,e,v,n,t,s)'
  template += '{if(f.fbq)return;n=f.fbq=function(){n.callMethod?'
  template += 'n.callMethod.apply(n,arguments):n.queue.push(arguments)};'
  template += 'if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';'
  template += 'n.queue=[];t=b.createElement(e);t.async=!0;'
  template += 't.src=v;s=b.getElementsByTagName(e)[0];'
  template += 's.parentNode.insertBefore(t,s)}(window, document,\'script\','
  template += `'${PixelBase}');`

  for (const property of properties) {
    template += `fbq('init', '${property.id}');`
    noscriptTemplate += `<img height="1" width="1" style="display:none" src="${NoScriptBase}?id=${property.id}&ev=PageView&noscript=1"/>\n`
  }
  template += 'fbq(\'track\', \'PageView\');'

  tags.push({
    tag: 'script',
    children: template,
  })
  tags.push({
    tag: 'noscript',
    injectTo: 'body-prepend',
    children: noscriptTemplate,
  })

  return tags
}
export default injectTag
