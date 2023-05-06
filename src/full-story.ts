import type { HtmlTagDescriptor } from 'vite'

declare global {
  interface Window {
    _fs_host: any[]
    _fs_script: any[]
    _fs_org: any[]
    _fs_namespace: any[]
  }
}

export interface FullStoryOptions {
  host?: string
  script?: string
  namespace?: string
  org?: string
}

const defaultOptions: FullStoryOptions = {
  host: 'fullstory.com',
  script: 'edge.fullstory.com/s/fs.js',
  namespace: 'FS',
}

function injectTag(options: FullStoryOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []
  const fullOptions = { ...defaultOptions, ...options }

  if (!fullOptions.org)
    return tags

  let template = ''

  template += `window['_fs_host'] = '${fullOptions.host}';`
  template += `window['_fs_script'] = '${fullOptions.script}';`
  template += `window['_fs_org'] = '${fullOptions.org}';`
  template += `window['_fs_namespace'] = '${fullOptions.namespace}';`
  template += '(function(m,n,e,t,l,o,g,y){'
  template += 'if (e in m) {if(m.console && m.console.log) { m.console.log(\'FullStory namespace conflict. Please set window["_fs_namespace"].\');} return;}'
  template += 'g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];'
  template += 'o=n.createElement(t);o.async=1;o.crossOrigin=\'anonymous\';o.src=\'https://\'+_fs_script;'
  template += 'y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);'
  template += 'g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g(\'event\',{n:i,p:v},s)};'
  template += 'g.anonymize=function(){g.identify(!!0)};'
  template += 'g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};'
  template += 'g.log = function(a,b){g("log",[a,b])};'
  template += 'g.consent=function(a){g("consent",!arguments.length||a)};'
  template += 'g.identifyAccount=function(i,v){o=\'account\';v=v||{};v.acctId=i;g(o,v)};'
  template += 'g.clearUserCookie=function(){};'
  template += 'g.setVars=function(n, p){g(\'setVars\',[n,p]);};'
  template += 'g._w={};y=\'XMLHttpRequest\';g._w[y]=m[y];y=\'fetch\';g._w[y]=m[y];'
  template += 'if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};'
  template += 'g._v="1.3.0";'
  template += '})(window,document,window[\'_fs_namespace\'],\'script\',\'user\');'

  tags.push({
    tag: 'script',
    children: template,
  })

  return tags
}
export default injectTag
