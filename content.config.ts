// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      // 建议去掉末尾的 .md，使用目录匹配模式
      source: 'products/**' 
    })
  }
})