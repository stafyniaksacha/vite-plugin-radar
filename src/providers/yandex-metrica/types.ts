export interface MetricaConfiguration {
  defer?: boolean
  clickmap?: boolean
  trackLinks?: boolean
  accurateTrackBounce?: boolean
  childIframe?: boolean
  webvisor?: boolean
  trackHash?: boolean
  triggerEvent?: boolean
  ecommerce?: string | boolean | any[]
  trustedDomains?: string[]
  type?: number
  params?: Record<string, string | number | boolean> | Record<string, string | number | boolean>[]
  userParams?: Record<string, string | number | boolean>
}

export interface YandexMetricaDefaults {
  /**
   * `tag.js` script source
   */
  script?: string
  /**
   * Tracking endpoint used by the `<noscript>` pixel
   */
  noScript?: string
}

export interface YandexMetricaProperty extends YandexMetricaDefaults {
  id: string
  config?: MetricaConfiguration
}

export type YandexMetricaOptions = YandexMetricaProperty | YandexMetricaProperty[]
