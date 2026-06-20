export interface FullStoryDefaults {
  host?: string
  script?: string
  namespace?: string
  /**
   * The FullStory loader snippet (the IIFE that boots the `FS` API).
   * Override only if you need to pin a different snippet version.
   */
  loader?: string
}

export interface FullStoryOptions extends FullStoryDefaults {
  org?: string
}
