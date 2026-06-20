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

export interface YandexMetricaProperty {
  id: string
  config?: MetricaConfiguration
}

export type YandexMetricaOptions = YandexMetricaProperty | YandexMetricaProperty[]
