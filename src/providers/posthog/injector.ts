import type { HtmlTagDescriptor } from 'vite'
import type { PostHogAnalyticsOptions } from './types'
import { defaults } from './default-values'

function injectTag(options: PostHogAnalyticsOptions): HtmlTagDescriptor[] {
  const tags: HtmlTagDescriptor[] = []

  if (!options.enabled)
    return tags

  if (!options.token)
    throw new Error('PostHog token is required')

  if (!options.api_host)
    throw new Error('PostHog API host is required')

  const { loader } = { ...defaults, ...options }

  tags.push({
    tag: 'script',
    injectTo: 'head',
    children: `
      ${loader}
      posthog.init('${options.token}', { api_host: '${options.api_host}', ...${options.config ? JSON.stringify(options.config) : '{}'} })
    `,
  })

  return tags
}

export default injectTag
