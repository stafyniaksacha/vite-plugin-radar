import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    VK: Function
  }
}

export type VKRetargeting = {
  /**
   * Retargeting tag
   */
  id: string
}

export type VKRetargetingOption = VKRetargeting | VKRetargeting[]

const RetargetingBase = 'https://vk.com/js/api/openapi.js?169'
const NoScriptBase = 'https://vk.com/rtrg'

function injectTag(options: VKRetargetingOption): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  let properties: VKRetargeting[] = []

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

  /// https://vk.com/faq14080
  let template = ''
  let noscriptTemplate = ''

  template += '!(function()'
  template += '{var t=document.createElement("script");t.type="text/javascript",'
  template += `t.async=!0,t.src="${RetargetingBase}",t.onload=function(){`

  for (const property of properties) {
    template += `VK.Retargeting.Init("${property.id}"),`
    noscriptTemplate += `<img height="1" width="1" style="display:none" src="${NoScriptBase}?p=${property.id}"/>\n`
  }
  template += 'VK.Retargeting.Hit()},document.head.appendChild(t);})();'

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
