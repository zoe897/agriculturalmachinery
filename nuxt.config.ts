import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 1. 核心模块配置：暂时移除 sitemap，确保编译不报路径替换错误
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ],

  // 2. 核心修复：彻底关闭 Nitro 预渲染引擎，不让它在打包时爬取任何路径
  nitro: {
    storage: {
      cache: {
        driver: 'memory' // 缓存全部走内存，不读写 Vercel 磁盘
      }
    },
    devStorage: {
      cache: {
        driver: 'memory'
      }
    },
    prerender: {
      crawlLinks: false, // 禁用链接爬取
      routes: []         // 预渲染路由设为空
    }
  },

  // 3. 路由规则：全站强制走标准的动态服务器渲染 (SSR)，避开打包静态化
  routeRules: {
    '/': { ssr: true },
    '/**': { ssr: true }
  },

  // 4. Content 组件修复：关闭内容层面的预渲染与实验性搜索索引
  content: {
    prerender: {
      routes: []
    },
    experimental: {
      search: false 
    }
  },

  // 5. 基础站点信息配置
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000',
    name: 'Agricultural Machinery Export'
  },

  // 6. 全局组件自动扫描
  components: [
    {
      path: '~/components',
      pathPrefix: true
    }
  ],

  // 7. 环境变量与运行时配置
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL || '',
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://localhost:3000'
    }
  },

  // 8. 图片优化配置
  image: {
    format: ['webp'],
    quality: 80
  },

  // 9. App 全局 Head 与样式配置
  app: {
    baseURL: '/', 
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: