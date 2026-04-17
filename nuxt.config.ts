import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    emailUser: process.env.NUXT_EMAIL_USER,
    emailPass: process.env.NUXT_EMAIL_PASS,
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/image',      
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/sitemap'
  ],
  image: {
    format: ['webp'],
    quality: 80,
  },
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true }, 
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' 
        }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-04-03',
  nitro: { 
    preset: 'static' 
  }
})
