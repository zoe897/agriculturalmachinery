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

  // 1. 彻底关闭路由级别的预渲染，转为全动态 SSR 模式
  routeRules: {
    '/': { ssr: true },
    '/products/**': { ssr: true }
  },

  app: {
    baseURL: '/', // 固定根路径，防止 replace 报错
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

  // 2. 核心修复：限制 @nuxt/content 模块在打包时的死锁行为
  content: {
    experimental: {
      search: false // 如果你没用内置搜索，关掉它可以防止打包时对内容做深度索引替换
    }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-04-03',

  // 3. 彻底封死 Nitro 级别的所有预渲染行为
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [],
      failOnError: false // 即使有残留的异步任务失败，也绝不卡死打包
    }
  }
})