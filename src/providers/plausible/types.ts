export interface PlausibleAnalyticsDefaults {
  /**
   * Tracking script source
   */
  script?: string
  /**
   * `defer` attribute set on the injected script tag
   */
  defer?: boolean
}

export interface PlausibleAnalyticsOptions extends PlausibleAnalyticsDefaults {
  enabled: boolean
  hostname?: string
}
