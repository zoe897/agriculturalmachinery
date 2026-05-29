import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  // 核心防御：强行给整个项目的站点 URL 注入绝对安全的非空兜底值
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
      // 显式兜底，彻底封死底层 framework 寻找 siteUrl 时引发的 replace 崩溃
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000'
    }
  },

  image: {
    format: ['webp'],
    quality: 80
  },

  routeRules: {
    '/': { ssr: true },
    '/products/**': { ssr: true }
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
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  content: {
    experimental: {
      search: false 
    }
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-04-03',

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
      failOnError: false 
    }
  }
})