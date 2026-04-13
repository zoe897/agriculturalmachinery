// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    products: defineCollection({
      type: 'page',
      // 扫描 content 文件夹下所有的 .md 文件
      source: '**/*.md',
      // 关键修复：显式定义 schema，确保 image 字段被正确抓取
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(), // 允许部分产品暂时没图
        series: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional()
      })
    })
  }
})