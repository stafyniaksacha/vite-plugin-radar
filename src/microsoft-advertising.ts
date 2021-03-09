import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    uetq: any[]
  }
}

export type MicrosoftAdvertisingOptions = {
  id: string
}

const UetBase = '//bat.bing.com/bat.js'

function injectTag(property: MicrosoftAdvertisingOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!property.id)
    return tags

  /// https://help.ads.microsoft.com/#apex/ads/en/ext60065/

  let template = ''

  template += '(function (w, d, t, r, u) {'
  template += `var f, n, i; w[u] = w[u] || [], f = function () { var o = { ti: "${property.id}" };`
  template += 'o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad") }, n = d.createElement(t), '
  template += 'n.src = r, n.async = 1, n.onload = n.onreadystatechange = function () { '
  template += 'var s = this.readyState; s && s !== "loaded" && s !== "complete" || (f(), '
  template += 'n.onload = n.onreadystatechange = null) }, i = d.getElementsByTagName(t)[0], '
  template += 'i.parentNode.insertBefore(n, i) })'
  template += `(window, document, "script", "${UetBase}", "uetq");`

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
