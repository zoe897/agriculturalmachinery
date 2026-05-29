import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  nitro: {
    storage: {
      cache: { driver: 'memory' }
    },
    devStorage: {
      cache: { driver: 'memory' }
    },
    prerender: {
      crawlLinks: false,
      routes: []
    }
  },

  routeRules: {
    '/': { ssr: true },
    '/**': { ssr: true }
  },

  content: {
    prerender: {
      routes: []
    },
    experimental: {
      search: false
    }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    name: 'Agricultural Machinery Export'
  },

  components: [
    {
      path: '~/components',
      pathPrefix: true
    }
  ],

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL || '',
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000'
    }
  },

  image: {
    format: ['webp'],
    quality: 80
  },

  app: {
    baseURL: '/',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght=400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-04-03'
})