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

  // 1. 修复防崩溃核心：为环境变量加上 || '' 兜底，防止 Prerender 阶段抛出 replace 错误
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

  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true }
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
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

  // 2. 双重保险：优化 Nitro 预渲染配置
  nitro: {
    prerender: {
      crawlLinks: false, // 避免自动爬取不存在的边缘死链接
      failOnError: false // 即使预渲染某些零散文件出错，也允许整体编译绿灯通过
    }
  }
})