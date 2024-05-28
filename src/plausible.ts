import type { HtmlTagDescriptor } from 'vite'

export interface PlausibleAnalyticsOptions {
  enabled: boolean
  hostname?: string
  script?: string
}

/**
 * @see https://plausible.io/docs/plausible-script
 */
const DefaultScriptUrl = 'https://plausible.io/js/script.js'

function injectTag(options: PlausibleAnalyticsOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.enabled)
    return tags

  const scriptAttrs: Record<string, string | boolean> = {
    src: options.script || DefaultScriptUrl,
    defer: true,
  }

  if (options.hostname)
    scriptAttrs['data-domain'] = options.hostname

  tags.push({
    tag: 'script',
    injectTo: 'head',
    attrs: scriptAttrs,
  })

  return tags
}
export default injectTag
