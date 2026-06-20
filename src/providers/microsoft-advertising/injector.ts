import type { HtmlTagDescriptor } from 'vite'
import type { MicrosoftAdvertisingOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    uetq: any[]
  }
}

function injectTag(property: MicrosoftAdvertisingOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!property.id)
    return tags

  const { id, script, async } = { ...defaults, ...property }

  /// https://help.ads.microsoft.com/#apex/ads/en/ext60065/

  let template = ''

  template += '(function (w, d, t, r, u) {'
  template += `var f, n, i; w[u] = w[u] || [], f = function () { var o = { ti: "${id}" };`
  template += 'o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad") }, n = d.createElement(t), '
  template += `n.src = r, n.async = ${async}, n.onload = n.onreadystatechange = function () { `
  template += 'var s = this.readyState; s && s !== "loaded" && s !== "complete" || (f(), '
  template += 'n.onload = n.onreadystatechange = null) }, i = d.getElementsByTagName(t)[0], '
  template += 'i.parentNode.insertBefore(n, i) })'
  template += `(window, document, "script", "${script}", "uetq");`

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
