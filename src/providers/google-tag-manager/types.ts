export interface GoogleTagManagerMainProperty {
  id: string
}

export interface GoogleTagManagerEnvironment {
  auth: string
  preview: string
}

export interface GoogleTagManagerDefaults {
  /**
   * `gtm.js` script source
   */
  gtmBase?: string
  /**
   * `ns.html` (noscript iframe) source
   */
  nsBase?: string
  /**
   * `async` attribute set on the injected `gtm.js` script tag
   */
  async?: boolean
  /**
   * Bootstrap snippet that initialises `dataLayer` and the `gtm.start` event
   */
  loader?: string
}

export interface GoogleTagManagerDefaultProperty extends GoogleTagManagerDefaults {
  environment?: GoogleTagManagerEnvironment
}

export type GoogleTagManagerProperty = GoogleTagManagerMainProperty & GoogleTagManagerDefaultProperty

export type GoogleTagManagerOptions = GoogleTagManagerProperty | GoogleTagManagerProperty[]
