import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite'
import type { GoogleAnaliticsOptions } from './google-analytics'
import injectGoogleAnalytics from './google-analytics'
import type { GoogleTagManagerOptions } from './google-tag-manager'
import injectGoogleTagManager from './google-tag-manager'
import type { FacebookPixelOption } from './facebook-pixel'
import injectPixel from './facebook-pixel'
import type { VKRetargetingOption } from './vk-retargeting'
import injectRetargeting from './vk-retargeting'
import type { LinkedinInsightOptions } from './linkedin-insight'
import injectLinkedinInsight from './linkedin-insight'
import type { BaiduTongjiOptions } from './baidu-tongji'
import injectBaiduTongji from './baidu-tongji'
import type { YandexMetricaOptions } from './yandex-metrica'
import injectYandexMetrica from './yandex-metrica'
import type { MicrosoftAdvertisingOptions } from './microsoft-advertising'
import injectMicrosoftAdvertising from './microsoft-advertising'
import type { HotjarOptions } from './hotjar'
import injectHotjar from './hotjar'
import type { FullStoryOptions } from './full-story'
import injectFullStory from './full-story'

export interface VitePluginRadarOptions {
  enableDev?: boolean
  analytics?: GoogleAnaliticsOptions
  gtm?: GoogleTagManagerOptions
  pixel?: FacebookPixelOption
  linkedin?: LinkedinInsightOptions
  tongji?: BaiduTongjiOptions
  metrica?: YandexMetricaOptions
  microsoft?: MicrosoftAdvertisingOptions
  retargeting?: VKRetargetingOption
  hotjar?: HotjarOptions
  fullStory?: FullStoryOptions
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
  retargeting,
  hotjar,
  fullStory,
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

      if (hotjar)
        tags.push(...injectHotjar(hotjar))

      if (fullStory)
        tags.push(...injectFullStory(fullStory))

      return tags
    },
  }
}

export default VitePluginRadar
