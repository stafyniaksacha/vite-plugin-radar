import type { HtmlTagDescriptor } from 'vite'
import type { YandexMetricaOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    dataLayer: any[]
    ym: (id: string, command: string, ...args: any[]) => void
  }
}

function injectTag(options: YandexMetricaOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  const properties = (Array.isArray(options) ? options : [options])
    .filter(property => Boolean(property.id))
    .map(property => ({ ...defaults, ...property }))

  if (!properties.length)
    return tags

  const [{ script }] = properties

  let template = ''
  let noscriptTemplate = ''

  /// https://yandex.com/support/metrica/quick-start.html

  template += '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};'
  template += 'm[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})'
  template += `(window, document, "script", "${script}", "ym");`

  for (const property of properties) {
    if (property.config)
      template += `ym("${property.id}", "init", ${JSON.stringify(property.config)});\n`
    else
      template += `ym("${property.id}", "init");\n`

    noscriptTemplate += `<img src="${property.noScript}${property.id}" style="position:absolute;left:-9999px;" alt="" />`
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
