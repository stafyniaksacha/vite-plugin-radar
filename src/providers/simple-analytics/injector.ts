import type { HtmlTagDescriptor } from 'vite'
import type { SimpleAnalyticsOptions } from './types'
import { defaults } from './default-values'

function injectTag(options: SimpleAnalyticsOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.enabled)
    return tags

  const { script, noScript, async, defer, hostname } = { ...defaults, ...options }

  let noScriptUrl = noScript
  const scriptAttrs: Record<string, string | boolean> = {
    src: script,
    async,
    defer,
  }

  if (hostname) {
    noScriptUrl += `?hostname=${hostname}`
    scriptAttrs['data-hostname'] = hostname
  }

  const noscriptTemplate = `<img src="${noScriptUrl}" referrerpolicy="no-referrer-when-downgrade" alt="" />`

  tags.push({
    tag: 'script',
    injectTo: 'body',
    attrs: scriptAttrs,
  })

  tags.push({
    tag: 'noscript',
    injectTo: 'body-prepend',
    children: noscriptTemplate,
  })

  return tags
}

export default injectTag
