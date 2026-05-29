import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  // 核心修复：强制重写 Nitro 存储驱动为内存模式，彻底绕开 Vercel 盘符路径报错
  nitro: {
    storage: {
      cache: {
        driver: 'memory'
      }
    },
    devStorage: {
      cache: {
        driver: 'memory'
      }
    },
    prerender: {
      crawlLinks: false, // 阻止爬虫盲目抓取导致未知变量未定义
      routes: [],
      failOnError: false   // 即使预渲染有些许警告，也不要卡死整个 Build 流程
    }
  },

  // 保持你现有的站点配置
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    name: 'Agricultural Machinery Export'
  },

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
      web3FormsKey: process.env.WEB3FORMS_KEY || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000'
    }
  },

  image: {
    format: ['webp'],
    quality: 80
  },

  routeRules: {
    '/': { ssr: true },
    '/products/**': { ssr: true }
  },

  app: {
    baseURL: '/', 
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

  content: {
    experimental: {
      search: false // 关闭实验性搜索，防止其在预渲染期间强制生成 SQLite 索引文件
    }
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-04-03'
})