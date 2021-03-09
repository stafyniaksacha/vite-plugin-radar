import { defineConfig } from 'vite'
import ViteRadar from 'vite-plugin-radar'

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
    ViteRadar({
      enableDev: true,
      analytics: {
        id: 'G-XXX',
      },
      gtm: {
        id: 'GTM-XXXX',
      },
      pixel: {
        id: '1234567890',
      },
    }),
  ],
})
