import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 1. Modules
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],

  // 2. Components auto-import
  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
  ],

  // 3. Dir structure
  dir: {
    pages: 'pages',
    layouts: 'layouts',
    middleware: 'middleware',
    public: 'public',
    assets: 'assets'
  },

  // 4. ✅ Runtime Config（核心修复点）
  runtimeConfig: {
    // 只在 server 端可访问（敏感信息）
    emailUser: process.env.NUXT_EMAIL_USER,
    emailPass: process.env.NUXT_EMAIL_PASS,
    resendApiKey: process.env.RESEND_API_KEY,
    googleSheetId: process.env.GOOGLE_SHEET_ID,
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,

    // 公开给前端（不能放敏感信息）
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY,
    }
  },

  // 5. Image optimization
  image: {
    format: ['webp'],
    quality: 80,
  },

  // 6. Route rules
  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true },
  },

  // 7. App config
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

  // 8. Global CSS
  css: ['~/assets/css/main.css'],

  // 9. Compatibility
  compatibilityDate: '2024-04-03',

  // 10. Nitro config
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    },
    externals: {
      external: ['better-sqlite3']
    }
  }
})