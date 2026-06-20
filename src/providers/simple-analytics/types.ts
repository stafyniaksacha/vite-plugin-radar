export interface SimpleAnalyticsDefaults {
  /**
   * Tracking script source
   */
  script?: string
  /**
   * `<noscript>` pixel source
   */
  noScript?: string
  /**
   * `async` attribute set on the injected script tag
   */
  async?: boolean
  /**
   * `defer` attribute set on the injected script tag
   */
  defer?: boolean
}

export interface SimpleAnalyticsOptions extends SimpleAnalyticsDefaults {
  enabled: boolean
  hostname?: string
}
