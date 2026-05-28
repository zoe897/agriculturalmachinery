import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

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
      web3FormsKey: process.env.WEB3FORMS_KEY || ''
    }
  },

  image: {
    format: ['webp'],
    quality: 80
  },

  // 1. 完全移除 routeRules 中的 prerender: true，断绝预渲染初始化
  routeRules: {
    '/': { ssr: true },
    '/products/**': { ssr: true }
  },

  app: {
    baseURL: '/', // 2. 直接写死根路径，不走 process.env，彻底消灭路径 replace 报错
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

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-04-03',

  // 3. 彻底关闭 nitro 的预渲染行为
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: []
    }
  }
})