import type { HtmlTagDescriptor } from 'vite'
import type { VKRetargetingOption } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    VK: any
  }
}

function injectTag(options: VKRetargetingOption): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  const properties = (Array.isArray(options) ? options : [options])
    .filter(property => Boolean(property.id))
    .map(property => ({ ...defaults, ...property }))

  if (!properties.length)
    return tags

  const [{ script, hit }] = properties

  /// https://vk.com/faq14080
  let template = ''
  let noscriptTemplate = ''

  template += '!(function()'
  template += '{var t=document.createElement("script");t.type="text/javascript",'
  template += `t.async=!0,t.src="${script}",t.onload=function(){`

  for (const property of properties) {
    template += `VK.Retargeting.Init("${property.id}"),`
    noscriptTemplate += `<img height="1" width="1" style="display:none" src="${property.noScript}?p=${property.id}"/>\n`
  }
  template += `${hit}},document.head.appendChild(t);})();`

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
