import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-02',
  devtools: { enabled: true },

  srcDir: 'src/',

  css: ['~/assets/styles/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  runtimeConfig: {
    // Server only: the browser never calls the backend. NUXT_BACKEND_URL overrides it.
    backendUrl: 'http://localhost:8100',
  },

  typescript: {
    strict: true,
  },

  // Local only; on Cloud Run the service sits behind IAP.
  devServer: {
    port: 8200,
  },
})
