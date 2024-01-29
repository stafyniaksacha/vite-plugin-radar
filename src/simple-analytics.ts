import type { HtmlTagDescriptor } from 'vite'

export interface SimpleAnalyticsOptions {
  enabled: boolean
  hostname?: string
  script?: string
  noScript?: string
}

/**
 * @see https://docs.simpleanalytics.com/script
 */
const SimpleAnalyticsBase = 'https://scripts.simpleanalyticscdn.com/latest.js'
const NoScriptBase = 'https://queue.simpleanalyticscdn.com/noscript.gif'

function injectTag(options: SimpleAnalyticsOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.enabled)
    return tags

  let noScriptUrl = options.noScript ? options.noScript : NoScriptBase
  const scriptAttrs: Record<string, string | boolean> = {
    src: options.script ? options.script : SimpleAnalyticsBase,
    async: true,
    defer: true,
  }

  if (options.hostname) {
    noScriptUrl += `?hostname=${options.hostname}`
    scriptAttrs['data-hostname'] = options.hostname
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
