import type { HtmlTagDescriptor } from 'vite'
import type { FacebookPixelOption } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    fbq: (event: string, id?: string, params?: Record<string, any>) => void
  }
}

function injectTag(options: FacebookPixelOption): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  const properties = (Array.isArray(options) ? options : [options])
    .filter(property => Boolean(property.id))
    .map(property => ({ ...defaults, ...property }))

  if (!properties.length)
    return tags

  const [{ script, event }] = properties

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
  template += `'${script}');`

  for (const property of properties) {
    template += `fbq('init', '${property.id}');`
    noscriptTemplate += `<img height="1" width="1" style="display:none" src="${property.noScript}?id=${property.id}&ev=PageView&noscript=1"/>\n`
  }
  template += `fbq('track', '${event}');`

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
