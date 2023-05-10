import type { HtmlTagDescriptor } from 'vite'

export interface UnbounceOptions {
  enabled: boolean
  script: string
}

/**
 * @see https://gist.github.com/unbounce/705431#file-unbounce-external-tracking-html
 */
const UnbounceBase = 'd3pkntwtp2ukl5.cloudfront.net/uba.js'

function injectTag(options: UnbounceOptions | true): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const sourceLocation = options === true ? UnbounceBase : options.script

  let template = ''

  template += 'var _ubaq = _ubaq || [];'
  template += '_ubaq.push(["trackGoal", "convert"]);'
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
