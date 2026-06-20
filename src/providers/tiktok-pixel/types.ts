export interface TikTokPixelDefaults {
  /**
   * TikTok pixel events script source
   */
  script?: string
  /**
   * Pixel methods registered on the `ttq` stub
   */
  methods?: string[]
  /**
   * Call executed right after the pixel is loaded
   */
  page?: string
}

export interface TikTokPixelOptions extends TikTokPixelDefaults {
  id: string
}
