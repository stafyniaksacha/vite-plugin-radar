import type { HtmlTagDescriptor } from 'vite'
import type { TikTokPixelOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    TiktokAnalyticsObject: 'ttq'
    ttq: Record<string, (...args: any[]) => void>
  }
}

function injectTag(options: TikTokPixelOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.id)
    return tags

  const { id, script: sourceLocation, methods, page } = { ...defaults, ...options }
  const methodsAsString = methods.map(s => `"${s}"`).join(', ')

  let template = ''

  template += '!(function (w, d, t) {'
  template += 'w.TiktokAnalyticsObject = t;'
  template += 'var ttq = (w[t] = w[t] || []);'
  template += `(ttq.methods = [${methodsAsString}]),`
  template += '(ttq.setAndDefer = function (t, e) {'
  template += 't[e] = function () {'
  template += 't.push([e].concat(Array.prototype.slice.call(arguments, 0)));'
  template += '};'
  template += '});'
  template += 'for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);'
  template += '(ttq.instance = function (t) {'
  template += 'for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);'
  template += 'return e;'
  template += '}),'
  template += '(ttq.load = function (e, n) {'
  template += `var i = ("https:" == document.location.protocol ? "https://" : "http://") + "${sourceLocation}";`
  template += '(ttq._i = ttq._i || {}), (ttq._i[e] = []), (ttq._i[e]._u = i), (ttq._t = ttq._t || {}), (ttq._t[e] = +new Date()), (ttq._o = ttq._o || {}), (ttq._o[e] = n || {});'
  template += 'var o = document.createElement("script");'
  template += '(o.type = "text/javascript"), (o.async = !0), (o.src = i + "?sdkid=" + e + "&lib=" + t);'
  template += 'var a = document.getElementsByTagName("script")[0];'
  template += 'a.parentNode.insertBefore(o, a);'
  template += '});'
  template += `ttq.load("${id}");`
  template += `${page};`
  template += '})(window, document, "ttq");'

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}

export default injectTag
