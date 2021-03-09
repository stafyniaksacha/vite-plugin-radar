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

      // Google Analytics
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

      // Google Tag Manager
      gtm: [
      ],

      // Facebook Pixel
      pixel: [
      ],

      // Linkedin Insight
      linkedin: [
      ],

      // Baidu Tongji
      tongji: [
      ],

      // Yandex Metrica
      metrica: [
      ],

      // Microsoft Analytics
      microsoft: {
      },
    })
  ],
}
```


## Ressources

- https://developers.google.com/analytics/devguides/collection/ga4
- https://developers.google.com/tag-manager/quickstart
- https://developers.facebook.com/docs/facebook-pixel/implementation
- https://www.linkedin.com/help/lms/answer/a427660
- https://yandex.com/support/metrica/quick-start.html
- https://tongji.baidu.com/open/api/more
- https://help.ads.microsoft.com/#apex/ads/en/ext60065/