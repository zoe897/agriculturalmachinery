// content.config.ts
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      // 只要写 products/** 即可，Nuxt 会自动在根目录的 content 文件夹里找
      source: 'products/**'
    })
  }
})