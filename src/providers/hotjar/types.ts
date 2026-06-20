export interface HotjarDefaults {
  /**
   * Hotjar tracking script source prefix
   */
  script?: string
  /**
   * Hotjar snippet version (`hjsv`)
   */
  version?: number
  /**
   * `async` value set on the injected script element
   */
  async?: number
}

export interface HotjarOptions extends HotjarDefaults {
  id: number
}
