import type { HtmlTagDescriptor } from 'vite'
import type { BaiduTongjiOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    _hmt: any[]
  }
}

function injectTag(options: BaiduTongjiOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  const properties = (Array.isArray(options) ? options : [options])
    .filter(property => Boolean(property.id))
    .map(property => ({ ...defaults, ...property }))

  if (!properties.length)
    return tags

  /// https://tongji.baidu.com/open/api/more

  let template = ''

  template += 'var _hmt = _hmt || [];\n'
  template += `_hmt.push(['_setAutoPageview', ${properties[0].autoPageview}]);\n`

  for (const property of properties)
    template += `_hmt.push(['_setAccount', '${property.id}']);\n`

  tags.push({
    tag: 'script',
    children: template,
  })

  for (const property of properties) {
    tags.push({
      tag: 'script',
      attrs: {
        src: `${property.script}?${property.id}`,
        async: property.async,
      },
    })
  }

  return tags
}
export default injectTag
