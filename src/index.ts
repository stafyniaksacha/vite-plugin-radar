import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite'
import type { BaiduTongjiOptions } from './providers/baidu-tongji'
import type { FacebookPixelOption } from './providers/facebook-pixel'
import type { FullStoryOptions } from './providers/full-story'
import type { GoogleAnaliticsOptions } from './providers/google-analytics'
import type { GoogleTagManagerOptions } from './providers/google-tag-manager'
import type { HotjarOptions } from './providers/hotjar'
import type { LinkedinInsightOptions } from './providers/linkedin-insight'
import type { MicrosoftAdvertisingOptions } from './providers/microsoft-advertising'
import type { MicrosoftClarityOptions } from './providers/microsoft-clarity'
import type { PlausibleAnalyticsOptions } from './providers/plausible'
import type { PostHogAnalyticsOptions } from './providers/posthog'
import type { SimpleAnalyticsOptions } from './providers/simple-analytics'
import type { TikTokPixelOptions } from './providers/tiktok-pixel'
import type { UnbounceOptions } from './providers/unbounce'
import type { VKRetargetingOption } from './providers/vk-retargeting'
import type { YandexMetricaOptions } from './providers/yandex-metrica'

export interface VitePluginRadarOptions {
  enableDev?: boolean
  analytics?: GoogleAnaliticsOptions
  gtm?: GoogleTagManagerOptions
  pixel?: FacebookPixelOption
  linkedin?: LinkedinInsightOptions
  tongji?: BaiduTongjiOptions
  metrica?: YandexMetricaOptions
  microsoft?: MicrosoftAdvertisingOptions
  microsoftClarity?: MicrosoftClarityOptions
  retargeting?: VKRetargetingOption
  hotjar?: HotjarOptions
  fullStory?: FullStoryOptions
  unbounce?: UnbounceOptions | boolean
  tiktok?: TikTokPixelOptions
  simpleanalytics?: SimpleAnalyticsOptions
  posthog?: PostHogAnalyticsOptions
  plausible?: PlausibleAnalyticsOptions
}

type InjectorKey = Exclude<keyof VitePluginRadarOptions, 'enableDev'>

interface InjectorEntry {
  key: InjectorKey
  // defaults to Boolean(value) when omitted
  enabled?: (value: any) => boolean
  load: () => Promise<{ default: (options: any) => HtmlTagDescriptor[] }>
}

// Per-entry generic ties `key` to the option/injector types so each entry is
// type-checked at definition time, while the registry stays a homogeneous list.
function defineInjector<K extends InjectorKey>(entry: {
  key: K
  enabled?: (value: NonNullable<VitePluginRadarOptions[K]>) => boolean
  load: () => Promise<{ default: (options: NonNullable<VitePluginRadarOptions[K]>) => HtmlTagDescriptor[] }>
}): InjectorEntry {
  return entry as InjectorEntry
}

// Order matters: HTML tags are injected in this sequence. Keep it stable.
// Exported so tests can spy on the lazy `load` calls.
export const INJECTORS: InjectorEntry[] = [
  defineInjector({ key: 'analytics', load: () => import('./providers/google-analytics') }),
  defineInjector({ key: 'gtm', load: () => import('./providers/google-tag-manager') }),
  defineInjector({ key: 'pixel', load: () => import('./providers/facebook-pixel') }),
  defineInjector({ key: 'retargeting', load: () => import('./providers/vk-retargeting') }),
  defineInjector({ key: 'tongji', load: () => import('./providers/baidu-tongji') }),
  defineInjector({ key: 'linkedin', load: () => import('./providers/linkedin-insight') }),
  defineInjector({ key: 'metrica', load: () => import('./providers/yandex-metrica') }),
  defineInjector({ key: 'microsoft', load: () => import('./providers/microsoft-advertising') }),
  defineInjector({ key: 'microsoftClarity', load: () => import('./providers/microsoft-clarity') }),
  defineInjector({ key: 'hotjar', load: () => import('./providers/hotjar') }),
  defineInjector({ key: 'fullStory', load: () => import('./providers/full-story') }),
  defineInjector({
    key: 'unbounce',
    enabled: value => value === true || (typeof value === 'object' && value.enabled === true),
    load: () => import('./providers/unbounce'),
  }),
  defineInjector({ key: 'tiktok', load: () => import('./providers/tiktok-pixel') }),
  defineInjector({ key: 'simpleanalytics', load: () => import('./providers/simple-analytics') }),
  defineInjector({ key: 'posthog', load: () => import('./providers/posthog') }),
  defineInjector({ key: 'plausible', load: () => import('./providers/plausible') }),
]

export function VitePluginRadar({
  enableDev = false,
  ...options
}: VitePluginRadarOptions): Plugin {
  let viteConfig: ResolvedConfig

  return {
    name: 'vite-plugin-Radar',

    configResolved(resolvedConfig: ResolvedConfig) {
      // store the resolved config
      viteConfig = resolvedConfig
    },

    async transformIndexHtml() {
      if (viteConfig.command === 'serve' && !enableDev)
        return []

      const active = INJECTORS.filter((entry) => {
        const value = options[entry.key]

        if (value == null)
          return false

        return entry.enabled ? entry.enabled(value) : Boolean(value)
      })

      // load only configured injectors; Promise.all keeps registry order
      const groups = await Promise.all(active.map(async (entry) => {
        const inject = (await entry.load()).default

        return inject(options[entry.key])
      }))

      return groups.flat()
    },
  }
}
