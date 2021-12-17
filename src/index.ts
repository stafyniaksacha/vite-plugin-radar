
import { Plugin, HtmlTagDescriptor, ResolvedConfig } from 'vite'
import injectGoogleAnalytics, { GoogleAnaliticsOptions } from './google-analytics'
import injectGoogleTagManager, { GoogleTagManagerOptions } from './google-tag-manager'
import injectPixel, { FacebookPixelOption } from './facebook-pixel'
import injectRetargeting, { VKRetargetingOption } from './vk-retargeting'
import injectLinkedinInsight, { LinkedinInsightOptions } from './linkedin-insight'
import injectBaiduTongji, { BaiduTongjiOptions } from './baidu-tongji'
import injectYandexMetrica, { YandexMetricaOptions } from './yandex-metrica'
import injectMicrosoftAdvertising, { MicrosoftAdvertisingOptions } from './microsoft-advertising'

export type VitePluginRadarOptions = {
  enableDev?: boolean
  analytics?: GoogleAnaliticsOptions
  gtm?: GoogleTagManagerOptions
  pixel?: FacebookPixelOption
  linkedin?: LinkedinInsightOptions
  tongji?: BaiduTongjiOptions
  metrica?: YandexMetricaOptions
  microsoft?: MicrosoftAdvertisingOptions
  retargeting?: VKRetargetingOption
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

      return tags
    },
  }
}

export default VitePluginRadar
