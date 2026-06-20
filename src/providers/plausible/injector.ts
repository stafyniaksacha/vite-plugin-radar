import type { HtmlTagDescriptor } from 'vite'
import type { PlausibleAnalyticsOptions } from './types'
import { defaults } from './default-values'

function injectTag(options: PlausibleAnalyticsOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.enabled)
    return tags

  const { script, defer, hostname } = { ...defaults, ...options }

  const scriptAttrs: Record<string, string | boolean> = {
    src: script,
    defer,
  }

  if (hostname)
    scriptAttrs['data-domain'] = hostname

  tags.push({
    tag: 'script',
    injectTo: 'head',
    attrs: scriptAttrs,
  })

  return tags
}
export default injectTag
