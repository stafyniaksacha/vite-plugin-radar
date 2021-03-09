import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    _linkedin_data_partner_ids: any[]
  }
}

export type LinkedinInsightProperty = {
  id: string
  // parameters?: object
}

export type LinkedinInsightOptions = LinkedinInsightProperty | LinkedinInsightProperty[]

const InsightBase = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
const NoScriptBase = 'https://px.ads.linkedin.com/collect/'

function injectTag(options: LinkedinInsightOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const properties: LinkedinInsightProperty[] = []

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

  template += 'window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];\n'

  for (const property of properties) {
    template += `window._linkedin_data_partner_ids.push(${property.id});\n`
    noscriptTemplate += `<img height="1" width="1" style="display:none;" alt="" src="${NoScriptBase}?pid=${property.id}&fmt=gif" />`
  }

  /// https://www.linkedin.com/help/lms/answer/a427660

  tags.push({
    tag: 'script',
    children: template,
  })
  tags.push({
    tag: 'script',
    attrs: {
      src: `${InsightBase}`,
      async: true,
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
