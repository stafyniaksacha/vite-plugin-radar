import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    _hmt: any[]
  }
}

export type BaiduTongjiProperty = {
  id: string
  parameters?: object
}

export type BaiduTongjiOptions = BaiduTongjiProperty | BaiduTongjiProperty[]

const TongjiBase = 'https://hm.baidu.com/hm.js'

function injectTag(options: BaiduTongjiOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const properties: BaiduTongjiProperty[] = []

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

  /// https://tongji.baidu.com/open/api/more

  let template = ''

  template += 'var _hmt = _hmt || [];\n'
  template += '_hmt.push([\'_setAutoPageview\', true]);\n'

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
        src: `${TongjiBase}?${property.id}`,
        async: true,
      },
    })
  }

  return tags
}
export default injectTag
