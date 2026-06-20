import type { HtmlTagDescriptor } from 'vite'
import type { FullStoryOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    _fs_host: any[]
    _fs_script: any[]
    _fs_org: any[]
    _fs_namespace: any[]
  }
}

function injectTag(options: FullStoryOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const fullOptions = { ...defaults, ...options }

  if (!fullOptions.org)
    return tags

  let template = ''

  template += `window['_fs_host'] = '${fullOptions.host}';`
  template += `window['_fs_script'] = '${fullOptions.script}';`
  template += `window['_fs_org'] = '${fullOptions.org}';`
  template += `window['_fs_namespace'] = '${fullOptions.namespace}';`
  template += fullOptions.loader

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
