export interface FacebookPixelDefaults {
  /**
   * `fbevents.js` script source
   */
  script?: string
  /**
   * Tracking endpoint used by the `<noscript>` pixel
   */
  noScript?: string
  /**
   * Event tracked on load (`fbq('track', <event>)`)
   */
  event?: string
}

export interface FacebookPixel extends FacebookPixelDefaults {
  /**
   * Pixel tag
   */
  id: string
}

export type FacebookPixelOption = FacebookPixel | FacebookPixel[]
