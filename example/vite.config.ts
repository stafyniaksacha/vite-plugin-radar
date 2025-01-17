import { defineConfig } from 'vite'
import { VitePluginRadar } from 'vite-plugin-radar'

export default defineConfig({
  // server: {
  //   port: 3000,
  //   // stickyPort: true,
  // },
  build: {
    // watch: {
    //   exclude: '*.css',
    // },
  },
  plugins: [
    VitePluginRadar({
      enableDev: true,
      analytics: {
        id: 'G-XXX',
      },
      gtm: [
        {
          id: 'GTM-XXXX',
        },
        {
          id: 'GTM-XXXX',
          gtmBase: 'https://www.custom.com/gtm.js',
          nsBase: 'https://www.custom.com/ns.html',
        },
      ],
      pixel: {
        id: 'XXXXXXXXXX',
      },
      retargeting: {
        id: 'VK-RTRG-XXXXXX-XXXXX',
      },

      // simpleanalytics: {
      //   enabled: true,
      //   hostname: 'www.custom.com',
      //   script: 'https://example.com/proxy.js',
      //   noScript: 'https://example.com/simple/noscript.gif',
      // },

      // Posthog
      // posthog: {
      //   enabled: true,
      //   token: 'phc_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      //   api_host: 'https://us.api.posthog.com',
      // },

      // plausible: {
      //   enabled: true,
      //   hostname: 'www.custom.com',
      //   script: 'https://example.com/js/script.js',
      // },
    }),
  ],
})
