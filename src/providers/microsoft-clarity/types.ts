export interface MicrosoftClarityDefaults {
  /**
   * Clarity tag script source (the property id is appended to it)
   */
  script?: string
  /**
   * `async` value set on the injected script element
   */
  async?: number
}

export interface MicrosoftClarityOptions extends MicrosoftClarityDefaults {
  id: string
}
