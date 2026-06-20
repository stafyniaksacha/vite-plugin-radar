import type { HtmlTagDescriptor } from 'vite'
import type { MicrosoftClarityOptions } from './types'
import { defaults } from './default-values'

declare global {
  interface Window {
    clarity: any[]
  }
}

function injectTag(property: MicrosoftClarityOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!property.id)
    return tags

  const { id, script, async } = { ...defaults, ...property }

  let template = ''

  template += '(function(c,l,a,r,i,t,y){'
  template += `c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};`
  template += `t=l.createElement(r);t.async=${async};t.src="${script}"+i;`
  template += 'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);'
  template += `})(window, document, "clarity", "script", "${id}");`

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
