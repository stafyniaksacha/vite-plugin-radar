import type { HtmlTagDescriptor } from 'vite'
import type { LinkedinInsightOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    _linkedin_data_partner_ids: any[]
  }
}

function injectTag(options: LinkedinInsightOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  const properties = (Array.isArray(options) ? options : [options])
    .filter(property => Boolean(property.id))
    .map(property => ({ ...defaults, ...property }))

  if (!properties.length)
    return tags

  let template = ''
  let noscriptTemplate = ''

  template += 'window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];\n'

  for (const property of properties) {
    template += `window._linkedin_data_partner_ids.push(${property.id});\n`
    noscriptTemplate += `<img height="1" width="1" style="display:none;" alt="" src="${property.noScript}?pid=${property.id}&fmt=gif" />`
  }

  /// https://www.linkedin.com/help/lms/answer/a427660

  const [{ script, async }] = properties

  tags.push({
    tag: 'script',
    children: template,
  })
  tags.push({
    tag: 'script',
    attrs: {
      src: `${script}`,
      async,
    },
  })
  tags.push({
    tag: 'noscript',
    injectTo: 'body-prepend',
    children: noscriptTemplate,
  })

  return tags
}
export default injectTag
