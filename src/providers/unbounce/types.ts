export interface UnbounceDefaults {
  /**
   * Unbounce tracking script source
   */
  script?: string
  /**
   * Goal pushed to `_ubaq` (raw arguments array as a string)
   */
  goal?: string
}

export interface UnbounceOptions extends UnbounceDefaults {
  enabled: boolean
}
