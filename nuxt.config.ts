import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 1. 模块配置
  modules: [
    '@nuxt/content',
    '@nuxt/image',      
    '@nuxtjs/tailwindcss', 
  ],

  // 2. 组件自动扫描配置（方案 A：支持层级目录）
  // 这样 components/header/navbar.vue 会自动映射为 <HeaderNavbar />
  components: [
    {
      path: '~/components',
      pathPrefix: true, 
    },
  ],

  // 3. 明确目录结构（确保 Nuxt 指向根目录，彻底告别旧的 app/ 目录干扰）
  dir: {
    pages: 'pages',
    layouts: 'layouts',
    middleware: 'middleware',
    public: 'public',
    assets: 'assets'
  },

  // 4. 环境变量配置
  runtimeConfig: {
    emailUser: process.env.NUXT_EMAIL_USER,
    emailPass: process.env.NUXT_EMAIL_PASS,
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY
    }
  },

  // 5. 图片优化
  image: {
    format: ['webp'],
    quality: 80,
  },

  // 6. 路由规则与预渲染优化
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true }, 
  },

  // 7. 全局页面配置（SEO 与 字体）
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

  // 8. 全局 CSS 路径
  css: ['~/assets/css/main.css'],

  // 9. 兼容性与服务端配置
  compatibilityDate: '2024-04-03',
  nitro: {
    prerender: {
      crawlLinks: true, // 开启自动爬取链接，确保所有 Markdown 产品页都能生成静态 HTML
      routes: ['/']
    },
    externals: {
      external: ['better-sqlite3']
    }
  }
})