import type { HtmlTagDescriptor } from 'vite'
import type { UnbounceOptions } from './types'
import { defaults } from './default-values'

function injectTag(options: UnbounceOptions | boolean): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const { script: sourceLocation, goal } = typeof options === 'object' ? { ...defaults, ...options } : defaults

  let template = ''

  template += 'var _ubaq = _ubaq || [];'
  template += `_ubaq.push(${goal});`
  template += '(function () {'
  template += 'var ub_script = document.createElement("script");'
  template += 'ub_script.type = "text/javascript";'
  template += `ub_script.src = ("https:" == document.location.protocol ? "https://" : "http://") + "${sourceLocation}";`
  template += 'var s = document.getElementsByTagName("script")[0];'
  template += 's.parentNode.insertBefore(ub_script, s);'
  template += '})();'

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}

export default injectTag
