<script setup lang="ts">
const route = useRoute()

// 1. 获取清洗后的路径 (例如: /products/tractor)
const cleanPath = route.path.replace(/\/$/, '').toLowerCase()

const { data: product, pending } = await useAsyncData(`content-${cleanPath}`, async () => {
  // 策略 A: 直接匹配路径 (匹配具体产品或分类 index.md)
  let res = await queryCollection('products').path(cleanPath).first()
  
  // 策略 B: 兜底逻辑，如果访问 /products/tractor 没找到，尝试匹配 /products/tractor/index
  if (!res) {
    res = await queryCollection('products').path(`${cleanPath}/index`).first()
  }
  
  return res
})
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-10">
    <div v-if="pending">Loading...</div>
    
    <div v-else-if="product">
      <!-- 渲染 Markdown 内容 -->
      <article class="prose max-w-none">
        <h1>{{ product.title }}</h1>
        <ContentRenderer :value="product" />
      </article>
      
      <!-- 如果这是个分类页 (index.md)，你可能还想列出该目录下的所有产品 -->
      <div v-if="product.path.endsWith('tractor')" class="mt-10">
         <!-- 这里可以写查询该目录下其他文件的逻辑 -->
      </div>
    </div>

    <div v-else class="text-red-500 border p-4">
      <p>未找到内容。尝试查询路径: {{ cleanPath }}</p>
      <p>请确保 GitHub 上存在: <code>content/products/tractor/index.md</code></p>
    </div>
  </main>
</template>