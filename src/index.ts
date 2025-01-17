import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite'
import type { BaiduTongjiOptions } from './baidu-tongji'
import type { FacebookPixelOption } from './facebook-pixel'
import type { FullStoryOptions } from './full-story'
import type { GoogleAnaliticsOptions } from './google-analytics'
import type { GoogleTagManagerOptions } from './google-tag-manager'
import type { HotjarOptions } from './hotjar'
import type { LinkedinInsightOptions } from './linkedin-insight'
import type { MicrosoftAdvertisingOptions } from './microsoft-advertising'
import type { MicrosoftClarityOptions } from './microsoft-clarity'
import type { PlausibleAnalyticsOptions } from './plausible'
import type { PostHogAnalyticsOptions } from './posthog'
import type { SimpleAnalyticsOptions } from './simple-analytics'
import type { TikTokPixelOptions } from './tiktok-pixel'
import type { UnbounceOptions } from './unbounce'
import type { VKRetargetingOption } from './vk-retargeting'
import type { YandexMetricaOptions } from './yandex-metrica'
import injectBaiduTongji from './baidu-tongji'
import injectPixel from './facebook-pixel'
import injectFullStory from './full-story'
import injectGoogleAnalytics from './google-analytics'
import injectGoogleTagManager from './google-tag-manager'
import injectHotjar from './hotjar'
import injectLinkedinInsight from './linkedin-insight'
import injectMicrosoftAdvertising from './microsoft-advertising'
import injectMicrosoftClarity from './microsoft-clarity'
import injectPlausible from './plausible'
import injectPosthog from './posthog'
import injectSimpleAnalytics from './simple-analytics'
import injectTikTokPixel from './tiktok-pixel'
import injectUnbounce from './unbounce'
import injectRetargeting from './vk-retargeting'
import injectYandexMetrica from './yandex-metrica'

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

export function VitePluginRadar({
  enableDev = false,
  analytics,
  gtm,
  pixel,
  linkedin,
  tongji,
  metrica,
  microsoft,
  microsoftClarity,
  retargeting,
  hotjar,
  fullStory,
  unbounce,
  tiktok,
  simpleanalytics,
  posthog,
  plausible,
}: VitePluginRadarOptions): Plugin {
  let viteConfig: ResolvedConfig

  return {
    name: 'vite-plugin-Radar',

    configResolved(resolvedConfig: ResolvedConfig) {
      // store the resolved config
      viteConfig = resolvedConfig
    },

    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = []

      if (viteConfig.command === 'serve' && !enableDev)
        return tags

      if (analytics)
        tags.push(...injectGoogleAnalytics(analytics))

      if (gtm)
        tags.push(...injectGoogleTagManager(gtm))

      if (pixel)
        tags.push(...injectPixel(pixel))

      if (retargeting)
        tags.push(...injectRetargeting(retargeting))

      if (tongji)
        tags.push(...injectBaiduTongji(tongji))

      if (linkedin)
        tags.push(...injectLinkedinInsight(linkedin))

      if (metrica)
        tags.push(...injectYandexMetrica(metrica))

      if (microsoft)
        tags.push(...injectMicrosoftAdvertising(microsoft))

      if (microsoftClarity)
        tags.push(...injectMicrosoftClarity(microsoftClarity))

      if (hotjar)
        tags.push(...injectHotjar(hotjar))

      if (fullStory)
        tags.push(...injectFullStory(fullStory))

      if (unbounce && (unbounce === true || unbounce.enabled === true))
        tags.push(...injectUnbounce(unbounce))

      if (tiktok)
        tags.push(...injectTikTokPixel(tiktok))

      if (simpleanalytics)
        tags.push(...injectSimpleAnalytics(simpleanalytics))

      if (posthog)
        tags.push(...injectPosthog(posthog))

      if (plausible)
        tags.push(...injectPlausible(plausible))

      return tags
    },
  }
}
