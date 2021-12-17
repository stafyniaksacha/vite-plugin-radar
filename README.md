# vite-plugin-radar

Analytics loader for vite that support Google Analytics, Google Tag Manager, Facebook Pixel, 
Linkedin Insight, Yandex Metrica, Baidu Tongji and Microsoft Advertising

### Install

```sh
npm i --save-dev vite-plugin-radar # yarn add -D vite-plugin-radar
```

### Add it to vite.config.js

```ts
// vite.config.js
import ViteRadar from 'vite-plugin-radar'

export default {
  plugins: [
    ViteRadar({
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
import ViteRadar from 'vite-plugin-radar'

export default {
  plugins: [
    ViteRadar({
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
           * @see 
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
