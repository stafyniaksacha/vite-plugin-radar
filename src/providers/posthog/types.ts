export interface PostHogAnalyticsOptions {
  enabled: boolean
  token: string
  api_host: string

  // Optional configuration passed to the PostHog initialization script
  // NOTE: Because we're marshalling the config into a string, we can't support all of the options
  // namely the ones that are functions.
  // @see https://posthog.com/docs/libraries/js#config
  //
  // If you need support for more options, you will need to configure PostHog manually.
  config?: Record<string, any>
}
