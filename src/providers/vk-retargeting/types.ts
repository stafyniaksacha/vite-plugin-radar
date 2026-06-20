export interface VKRetargetingDefaults {
  /**
   * `openapi.js` script source
   */
  script?: string
  /**
   * Tracking endpoint used by the `<noscript>` pixel
   */
  noScript?: string
  /**
   * Hit call executed once the script is loaded
   */
  hit?: string
}

export interface VKRetargeting extends VKRetargetingDefaults {
  /**
   * Retargeting tag
   */
  id: string
}

export type VKRetargetingOption = VKRetargeting | VKRetargeting[]
