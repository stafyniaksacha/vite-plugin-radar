export interface MicrosoftAdvertisingDefaults {
  /**
   * `bat.js` (UET) script source
   */
  script?: string
  /**
   * `async` value set on the injected script element
   */
  async?: number
}

export interface MicrosoftAdvertisingOptions extends MicrosoftAdvertisingDefaults {
  id: string
}
