// content.config.ts
import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // 这里的名称必须和 queryCollection('products') 一致
    products: defineCollection({
      type: 'page',
      // 修改这里：直接指定扫描 content 目录下的所有文件
      source: '**' 
    })
  }
})