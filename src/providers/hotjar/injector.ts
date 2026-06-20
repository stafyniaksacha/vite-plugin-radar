import type { HtmlTagDescriptor } from 'vite'
import type { HotjarOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    hj: any[]
    _hjSettings: any[]
  }
}

function injectTag(options: HotjarOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.id)
    return tags

  const { id, script, version, async } = { ...defaults, ...options }

  let template = ''

  template += '(function(h,o,t,j,a,r){'
  template += 'h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};'
  template += `h._hjSettings={hjid:${id},hjsv:${version}};`
  template += 'a=o.getElementsByTagName("head")[0];'
  template += `r=o.createElement("script");r.async=${async};`
  template += 'r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;'
  template += 'a.appendChild(r);'
  template += `})(window,document,'${script}','.js?sv=');`

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
