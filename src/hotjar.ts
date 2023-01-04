import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    hj: any[]
    _hjSettings: any[]
  }
}

export type HotjarOptions = {
  id: number
}

const HotjarBase = 'https://static.hotjar.com/c/hotjar-'

function injectTag(options: HotjarOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.id)
    return tags

  let template = ''

  template += '(function(h,o,t,j,a,r){'
  template += 'h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};'
  template += `h._hjSettings={hjid:${options.id},hjsv:6};`
  template += 'a=o.getElementsByTagName("head")[0];'
  template += 'r=o.createElement("script");r.async=1;'
  template += 'r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;'
  template += 'a.appendChild(r);'
  template += `})(window,document,'${HotjarBase}','.js?sv=');`

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
