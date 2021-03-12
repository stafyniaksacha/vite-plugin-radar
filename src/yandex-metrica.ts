import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    ym: Function
  }
}
type MetricaConfiguration = {
  defer?: boolean
  clickmap?: boolean
  trackLinks?: boolean
  accurateTrackBounce?: boolean
  childIframe?: boolean
  webvisor?: boolean
  trackHash?: boolean
  triggerEvent?: boolean
  ecommerce?: string | boolean | any[]
  trustedDomains?: string[]
  type?: number
  params?: Record<string, string | number | boolean> | Record<string, string | number | boolean>[]
  userParams?: Record<string, string | number | boolean>
}

export type YandexMetricaProperty = {
  id: string
  config?: MetricaConfiguration
}

export type YandexMetricaOptions = YandexMetricaProperty | YandexMetricaProperty[]

// https://mc.yandex.ru/metrika/tag.js
const MetricaBase = 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
const NoScriptBase = 'https://mc.yandex.ru/watch/'

function injectTag(options: YandexMetricaOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const properties: YandexMetricaProperty[] = []

  if (Array.isArray(options)) {
    properties.push(
      ...options,
    )
  }
  else {
    properties.push(options)
  }

  if (!properties.length)
    return tags

  let template = ''
  let noscriptTemplate = ''

  /// https://yandex.com/support/metrica/quick-start.html

  template += '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};'
  template += 'm[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})'
  template += `(window, document, "script", "${MetricaBase}", "ym");`

  for (const property of properties) {
    if (property.config)
      template += `ym(${property.id}, ${JSON.stringify(property.config)});\n`
    else
      template += `ym(${property.id}});\n`

    noscriptTemplate += `<img src="${NoScriptBase}${property.id}" style="position:absolute;left:-9999px;" alt="" />`
  }

  tags.push({
    tag: 'script',
    children: template,
  })

  tags.push({
    tag: 'noscript',
    injectTo: 'body-prepend',
    children: `<div>${noscriptTemplate}</div>`,
  })

  return tags
}
export default injectTag
