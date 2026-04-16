// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. 合并后的 RuntimeConfig (修复冲突)
  runtimeConfig: {
    // 只有在服务端可以访问 (用于发送邮件)
    emailUser: process.env.NUXT_EMAIL_USER,
    emailPass: process.env.NUXT_EMAIL_PASS,
    
    // public 里的内容可以在前端（浏览器）访问
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY
    }
  },

  // 2. 模块配置 (添加了关键的 @nuxt/image 和 @nuxtjs/tailwindcss)
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxt/image',      // <--- 必须添加，解决之前的 Build 报错
    '@nuxtjs/tailwindcss' // <--- 确保 Tailwind 模块也被正确加载
  ],

  // 3. 针对外贸站的图片优化配置
  image: {
    format: ['webp'],
    quality: 80,
    // 如果你有远程图片，可以在这里配置 domains
  },

  // 4. 路由规则：针对农机产品页进行预渲染优化
  routeRules: {
    '/': { prerender: true },
    // 自动预渲染所有产品深层路径，提升海外打开速度
    '/products/**': { prerender: true }, 
  },

  // 5. 核心 App 设置
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' }, // 外贸站建议强制设为英文
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }
      ]
    }
  },

  // 6. 其他技术配置
  css: ['~/assets/css/main.css'],
  
  future: {
    compatibilityVersion: 4,
  },
  
  compatibilityDate: '2024-04-03',
  
  devtools: { enabled: true },

  nitro: {
    preset: 'static' // 强制静态化，适合 Vercel/Cloudflare Pages 部署
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lucide-vue-next',
      ]
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['count', 'scroll-reveal', 'scroll-group'].includes(tag)
    }
  }
})