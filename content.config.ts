// content.config.ts
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      // 扫描 content 文件夹下所有的 .md 文件
      source: '**/*.md'
    })
  }
})