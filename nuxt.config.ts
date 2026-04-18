import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 1. 暂时先不要 site 域名配置（因为它主要是给 sitemap 用的）
  
  // 2. 模块配置：把 '@nuxtjs/sitemap' 删掉
  modules: [
    '@nuxt/content',
    '@nuxt/image',      
    '@nuxtjs/tailwindcss', 
    // '@nuxtjs/sitemap'  <-- 删掉这一行
  ],

  // 3. 环境变量配置
  runtimeConfig: {
    emailUser: process.env.NUXT_EMAIL_USER,
    emailPass: process.env.NUXT_EMAIL_PASS,
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY
    }
  },

  // 4. 删掉这一整块 sitemap 配置
  /* sitemap: {
    strictNuxtContentAds: false,
    discoverImages: false
  }, */

  // 5. 图片优化（保持现状）
  image: {
    format: ['webp'],
    quality: 80,
  },

  // 6. 路由与预渲染（这是重点，确保你的产品页能被静态化）
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true }, 
  },

  // 7. 全局页面配置（保持现状）
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

  // 8. 样式路径
  css: ['~/assets/css/main.css'],

  // 9. 兼容性与服务端配置
  compatibilityDate: '2024-04-03',
  nitro: {
    externals: {
      external: ['better-sqlite3']
    }
  }
})