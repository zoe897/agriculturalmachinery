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
  // 保持静态预渲染以优化农机产品页的 SEO
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
  // 核心修复：对齐你的实际文件路径
  css: ['~/app/assets/css/main.css'],
  compatibilityDate: '2024-04-03',
  // 核心修复：删除 nitro preset: 'static'，添加外部依赖声明
  nitro: {
    externals: {
      external: ['better-sqlite3']
    }
  }
})