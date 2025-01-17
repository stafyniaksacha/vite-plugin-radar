# vite-plugin-radar

Analytics loader for vite that support Google Analytics, Google Tag Manager, Facebook Pixel,
Linkedin Insight, Yandex Metrica, Baidu Tongji, Microsoft Advertising and Unbounce

### Install

```sh
npm i --save-dev vite-plugin-radar # yarn add -D vite-plugin-radar
```

### Add it to vite.config.js

```ts
// vite.config.js
import { VitePluginRadar } from 'vite-plugin-radar'

export default {
  plugins: [
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-XXXXX',
      },
    })
  ],
}
```

## Options

```ts
// vite.config.js
import { VitePluginRadar } from 'vite-plugin-radar'

export default {
  plugins: [
    VitePluginRadar({
      /**
       * enable or disable scripts injection in development
       * default: false
       */
      enableDev: true,

      // Google Analytics (multiple tag can be set with an array)
      analytics: [
        {
          /**
           * Measurement id
           */
          id: 'G-XXXXX',

          /**
           * disable tracking for this measurement
           *   window['ga-disable-MEASUREMENT_ID'] = true
           * @see https://developers.google.com/analytics/devguides/collection/ga4/disable-analytics
           */
          disable: true,

          /**
           * You can configure all settings provided by analytics here
           * @see https://developers.google.com/analytics/devguides/collection/ga4/cookies-user-id
           * @see https://developers.google.com/analytics/devguides/collection/ga4/disable-page-view
           * @see https://developers.google.com/analytics/devguides/collection/ga4/display-features
           */
          config: {
            cookie_domain: 'auto',
            cookie_expires: 63072000,
            cookie_prefix: 'none',
            cookie_update: true,
            cookie_flags: '',
            send_page_view: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: true,
          },

          /**
           * Set default values for "consent mode"
           * @see https://developers.google.com/tag-platform/devguides/consent
           * @see https://support.google.com/analytics/answer/9976101
           */
          consentDefaults: {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            wait_for_update: 500
          },

          /**
           * You set persitent values
           * @see https://developers.google.com/analytics/devguides/collection/ga4/persistent-values
           */
          persistentValues: {
            currency: 'USD',
          }
        },
        // You can add as many measurement id as you need
        {
          id: 'UA-YYYYY',
        },
      ],

      // Google Tag Manager (multiple tag can be set with an array)
      gtm: [
        {
          id: 'GTM-XXXXX',

          // You can set custom source for gtm script and noscript
          gtmBase: 'https://www.custom.com/gtm.js',
          nsBase: 'https://www.custom.com/ns.html',
          // You can optionally define the environment for the gtm.
          environment: {
            auth: 'X1YzAB2CDEFGh3ijklmnoP',
            preview: 'env-x',
          },
        }
      ],

      // Facebook Pixel (multiple tag can be set with an array)
      pixel: [
        {
          id: 'XXXXXXX',
        }
      ],

      // VK Retargeting (multiple tag can be set with an array)
      retargeting: [
        {
          id: 'VK-RTRG-XXXXXX-XXXXX',
        }
      ],

      // Linkedin Insight (multiple tag can be set with an array)
      linkedin: [
        {
          id: 'XXXXXXX',
        }
      ],

      // Baidu Tongji (multiple tag can be set with an array)
      tongji: [
        {
          id: 'XXXXXXX',
        }
      ],

      // Yandex Metrica (multiple tag can be set with an array)
      metrica: [
        {
          id: 'XXXXXXX',

          /**
           * You can configure all settings provided by metrika here
           * @see https://yandex.com/support/metrica/code/counter-initialize.html
           */
          config: {
            defer: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            childIframe: true,
            webvisor: true,
            trackHash: true,
            triggerEvent: true,
            ecommerce: 'dataLayer',
            trustedDomains: ['example.com'],
            type: 0,
            params: {},
            userParams: {}
          }
        }
      ],

      // Microsoft Analytics (only one tag can be set)
      microsoft: {
        id: 'XXXXX'
      },

      // Microsoft Clarity (only one tag can be set)
      microsoftClarity: {
        id: 'XXXXX'
      },

      // Hotjar Analytics (only one tag can be set)
      hotjar: {
        id: 1000000
      },

      // Full story Analytics (only one tag can be set)
      fullStory: {
        org: 'X-XXXXXX-XXX',
        host: 'fullstory.com',
        script: 'edge.fullstory.com/s/fs.js',
        namespace: 'FS',
      },

      // Unbounce conversion analytics
      // Can also be enabled like so: `unbounce: true`
      unbounce: {
        enabled: true, // or false
        // You can set a custom location or use the default one for unbounce
        script: 'd3pkntwtp2ukl5.cloudfront.net/uba.js'
      },

      // TikTok Pixel Analytics (only one tag can be set)
      tiktok: {
        id: 1000000,
        // You can set a custom location or use the default one for TikTok
        script: 'analytics.tiktok.com/i18n/pixel/events.js'
      },

      // SimpleAnalytics
      simpleanalytics: {
        enabled: true, // or false
        /**
         * You can overwrite domain name (optional)
         * @see https://docs.simpleanalytics.com/overwrite-domain-name
         */
        hostname: 'example.com',
        /**
         * You can configure a proxy (optional)
         * @see https://docs.simpleanalytics.com/proxy
         */
        script: 'https://example.com/proxy.js',
        noScript: 'https://example.com/simple/noscript.gif'
      },

      // Posthog
      posthog: {
        enabled: true, // or false
        token: 'phc_XXXXXXXXXXXXXXXXXXXXXXXX', // Find this on https://us.posthog.com/project/settings/project-details#variables
        api_host: 'https://us.i.posthog.com',

        // Optional configuration passed to the PostHog initialization script
        // NOTE: Because we're marshalling the config into a string, we can't support all of the options
        // namely the ones that are functions.
        // @see https://posthog.com/docs/libraries/js#config
        //
        // If you need support for more options, you will need to configure PostHog manually.
        config: {},
      },

      // Plausible
      plausible: {
        enabled: true, // or false
        /**
         * You can overwrite domain name to send stats to multiple Plausible dashboards (optional)
         * @see https://plausible.io/docs/plausible-script#can-i-send-stats-to-multiple-dashboards-at-the-same-time
         */
        hostname: 'example.com',
        /**
         * You can configure a proxy (optional)
         * @see https://plausible.io/docs/proxy/introduction
         */
        script: 'example.com/js/script.js',
      },
    })
  ],
}
```

## Resources

- https://developers.google.com/analytics/devguides/collection/ga4
- https://developers.google.com/tag-manager/quickstart
- https://developers.facebook.com/docs/facebook-pixel/implementation
- https://www.linkedin.com/help/lms/answer/a427660
- https://yandex.com/support/metrica/quick-start.html
- https://tongji.baidu.com/open/api/more
- https://vk.com/faq14080
- https://help.ads.microsoft.com/#apex/ads/en/ext60065/
- https://help.hotjar.com/hc/en-us/articles/115009336727-How-to-Install-Your-Hotjar-Tracking-Code
- https://help.fullstory.com/hc/en-us/articles/360020623514-Installing-the-FullStory-Script#:~:text=Install%20your%20snippet%20directly%20on,closing%20tag.
- https://documentation.unbounce.com/hc/en-us/articles/203879180-Setting-Conversion-Goals-in-the-Classic-Builder
- https://posthog.com/docs/libraries/js
