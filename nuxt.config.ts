import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. 运行配置：合并前端与后端环境变量
  runtimeConfig: {
    // 仅服务端可见
    emailUser: (process as any).env.NUXT_EMAIL_USER,
    emailPass: (process as any).env.NUXT_EMAIL_PASS,
    // 前端浏览器可见
    public: {
      web3FormsKey: (process as any).env.WEB3FORMS_KEY
    }
  },

  // 2. 模块配置：激活核心功能
  modules: [
    '@nuxt/content',
    '@nuxt/image',      
    '@nuxtjs/tailwindcss', // 自动处理 Tailwind CSS v4
    '@nuxtjs/sitemap'
  ],

  // 3. 图片优化：为外贸站大图提供自动压缩
  image: {
    format: ['webp'],
    quality: 80,
  },

  // 4. 路由与预渲染：提升产品页 Google 索引速度
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true }, 
  },

  // 5. App 基础设置：SEO 友好
  app: {
    baseURL: (process as any).env.NUXT_APP_BASE_URL || '/',
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

  // 6. 其他技术参数
  css: ['~/assets/css/main.css'],
  
  future: { 
    compatibilityVersion: 4 
  },
  
  compatibilityDate: '2024-04-03',
  
  devtools: { enabled: true },

  nitro: { 
    preset: 'static' 
  },

  // 7. 构建优化
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'lucide-vue-next']
    }
  },

  // 8. Vue 指令兼容
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['count', 'scroll-reveal', 'scroll-group'].includes(tag)
    }
  }
})