export interface LinkedinInsightDefaults {
  /**
   * `insight.min.js` script source
   */
  script?: string
  /**
   * Collect endpoint used by the `<noscript>` pixel
   */
  noScript?: string
  /**
   * `async` attribute set on the injected script tag
   */
  async?: boolean
}

export interface LinkedinInsightProperty extends LinkedinInsightDefaults {
  id: string
}

export type LinkedinInsightOptions = LinkedinInsightProperty | LinkedinInsightProperty[]
