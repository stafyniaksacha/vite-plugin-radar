import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    dataLayer: any[]
    ym: (id: string, command: string, ...args: any[]) => void
  }
}
interface MetricaConfiguration {
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

export interface YandexMetricaProperty {
  id: string
  config?: MetricaConfiguration
}

export type YandexMetricaOptions = YandexMetricaProperty | YandexMetricaProperty[]

const MetricaBase = 'https://mc.yandex.ru/metrika/tag.js'
const NoScriptBase = 'https://mc.yandex.ru/watch/'

function injectTag(options: YandexMetricaOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  let properties: YandexMetricaProperty[] = []

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
  let noscriptTemplate = ''

  /// https://yandex.com/support/metrica/quick-start.html

  template += '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};'
  template += 'm[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})'
  template += `(window, document, "script", "${MetricaBase}", "ym");`

  for (const property of properties) {
    if (property.config)
      template += `ym("${property.id}", "init", ${JSON.stringify(property.config)});\n`
    else
      template += `ym("${property.id}", "init");\n`

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
