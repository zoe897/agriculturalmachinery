<script setup lang="ts">
const route = useRoute()

// 1. 基础路径处理
const rawPath = route.path.replace(/\/$/, '') // 原始路径（带 /products）
const lowerPath = rawPath.toLowerCase()        // 全小写路径
const slugOnly = route.params.slug ? `/${Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug}` : ''

// 2. 多重兜底查询
const { data: product, pending } = await useAsyncData(`prod-${lowerPath}`, async () => {
  // 策略 A: 尝试全小写完整路径 (最常用: /products/tractor)
  let res = await queryCollection('products').path(lowerPath).first()
  
  // 策略 B: 如果 A 失败，尝试原始大小写路径 (防止文件名是大写的: /products/Tractor)
  if (!res) {
    res = await queryCollection('products').path(rawPath).first()
  }
  
  // 策略 C: 如果 B 失败，尝试不带前缀的 slug (部分配置下会变成: /tractor)
  if (!res && slugOnly) {
    res = await queryCollection('products').path(slugOnly).first()
    if (!res) res = await queryCollection('products').path(slugOnly.toLowerCase()).first()
  }

  return res
})

// 3. SEO
useSeoMeta({
  title: () => product.value?.title || 'Product Details',
  description: () => product.value?.description || 'Agricultural Machinery'
})
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 py-10">
    <div v-if="pending" class="text-center">加载中...</div>
    
    <div v-else-if="product">
      <!-- 面包屑或返回链接 -->
      <NuxtLink to="/products" class="text-green-600 mb-4 inline-block">← 返回产品列表</NuxtLink>
      
      <article class="prose lg:prose-xl mx-auto">
        <h1>{{ product.title }}</h1>
        <!-- Nuxt Content v3 渲染组件 -->
        <ContentRenderer :value="product" />
      </article>
    </div>

    <!-- 调试诊断面板：仅当找不到数据时显示 -->
    <div v-else class="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
      <h2 class="text-red-600 font-bold text-xl mb-4">内容抓取失败诊断</h2>
      <div class="space-y-2 text-sm font-mono bg-white p-4 rounded border">
        <p><strong>URL 路径:</strong> {{ route.path }}</p>
        <p><strong>尝试过的路径 1 (小写):</strong> {{ lowerPath }}</p>
        <p><strong>尝试过的路径 2 (原始):</strong> {{ rawPath }}</p>
        <p><strong>尝试过的路径 3 (纯Slug):</strong> {{ slugOnly }}</p>
      </div>
      
      <div class="mt-6">
        <h3 class="font-bold">排查清单：</h3>
        <ul class="list-disc ml-5 mt-2 text-gray-700">
          <li>检查 GitHub 上的文件：<code>content/products/tractor.md</code> 是否存在？</li>
          <li>检查文件开头是否有 <code>---</code> 分隔的 Frontmatter？</li>
          <li>尝试将文件名统一改为全小写。</li>
        </ul>
      </div>
    </div>
  </main>
</template>