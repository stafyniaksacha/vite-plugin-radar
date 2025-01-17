import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    clarity: any[]
  }
}

export interface MicrosoftClarityOptions {
  id: string
}

const ClarityBase = 'https://www.clarity.ms/tag/'

function injectTag(property: MicrosoftClarityOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!property.id)
    return tags

  let template = ''

  template += '(function(c,l,a,r,i,t,y){'
  template += `c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};`
  template += `t=l.createElement(r);t.async=1;t.src="${ClarityBase}"+i;`
  template += 'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);'
  template += `})(window, document, "clarity", "script", "${property.id}");`

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
