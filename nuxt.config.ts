import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 1. 运行配置
  runtimeConfig: {
    emailUser: (process as any).env.NUXT_EMAIL_USER,
    emailPass: (process as any).env.NUXT_EMAIL_PASS,
    public: {
      web3FormsKey: (process as any).env.WEB3FORMS_KEY
    }
  },

  // 2. 模块配置
  modules: [
    '@nuxt/content',
    '@nuxt/image',      
    '@nuxtjs/tailwindcss', 
    '@nuxtjs/sitemap'
  ],

  // 3. 图片优化
  image: {
    format: ['webp'],
    quality: 80,
  },

  // 4. 路由与预渲染
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true }, 
  },

  // 5. App 基础设置
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

  // 6. 核心 CSS 导入
  css: ['~/assets/css/main.css'],

  // 7. PostCSS 强制修正
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}, 
      'autoprefixer': {}
    }
  },

  // 8. Tailwind 模块补丁
  tailwindcss: {
    configPath: '', 
    viewer: false
  },
  
  // 9. 技术参数
  future: { 
    compatibilityVersion: 4 
  },
  
  compatibilityDate: '2024-04-03',
  
  devtools: { enabled: true },

  nitro: { 
    preset: 'static' 
  },

  // 10. 构建优化
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'lucide-vue-next']
    }
  },

  // 11. Vue 指令兼容
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['count', 'scroll-reveal', 'scroll-group'].includes(tag)
    }
  }
})
