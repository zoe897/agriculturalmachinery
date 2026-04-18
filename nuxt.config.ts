import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 1. 站点基础信息（修复 Sitemap 报错的关键）
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://your-actual-domain.vercel.app'
  },

  // 2. 模块配置
  modules: [
    '@nuxt/content',
    '@nuxt/image',      
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/sitemap'
  ],

  // 3. 环境变量配置
  runtimeConfig: {
    emailUser: process.env.NUXT_EMAIL_USER,
    emailPass: process.env.NUXT_EMAIL_PASS,
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY
    }
  },

  // 4. Sitemap 容错优化
  sitemap: {
    strictNuxtContentAds: false,
    discoverImages: false
  },

  // 5. 图片优化
  image: {
    format: ['webp'],
    quality: 80,
  },

  // 6. 路由与预渲染
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true }, 
  },

  // 7. 全局页面配置
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

  // 8. 样式路径（已对齐你的 app/ 目录）
  css: ['~/app/assets/css/main.css'],

  // 9. 兼容性与服务端配置
  compatibilityDate: '2024-04-03',
  nitro: {
    externals: {
      external: ['better-sqlite3']
    }
  }
})