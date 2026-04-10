<template>
  <main class="min-h-screen bg-white py-12">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>

    <div v-else-if="product" class="max-w-7xl mx-auto px-4">
      <!-- 这里放你之前的详情页 UI 代码 -->
      <h1 class="text-3xl font-bold">{{ product.title }}</h1>
      <ContentRenderer :value="product" class="prose max-w-none mt-8" />
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-900">Product Not Found</h2>
      <NuxtLink to="/products" class="text-green-600 hover:underline mt-4 inline-block">
        Back to Products
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()

// 1. 获取路径并处理
// 例如：/products/implement/harvesting/potato-harvester
// path 此时就是完整路径
const cleanPath = route.path.replace(/\/$/, '')

// 2. 使用 Nuxt Content v3 查询数据
const { data: product, pending } = await useAsyncData(`product-${cleanPath}`, () => {
  return queryCollection('products')
    .path(cleanPath)
    .first()
})

// 3. 设置 SEO Meta
watchEffect(() => {
  if (product.value) {
    useSeoMeta({
      title: `${product.value.title} - Agricultural Machinery`,
      description: product.value.description
    })
  }
})
</script>