<script setup lang="ts">
const route = useRoute()

// 1. 更加彻底的路径清洗函数
const getPathsToTry = (rawPath: string) => {
  const p = rawPath.replace(/\/$/, '').toLowerCase()
  return [p, `${p}/index`, p.replace('/products/', '')]
}

const { data: product, refresh, pending } = await useAsyncData(`prod-${route.path}`, async () => {
  const tries = getPathsToTry(route.path)
  
  // 循环尝试所有可能的路径组合
  for (const path of tries) {
    const doc = await queryCollection('products').path(path).first()
    if (doc) return doc
  }
  
  // 如果还是找不到，尝试模糊搜索（最后的保底方案）
  const lastSegment = route.path.split('/').pop()?.toLowerCase()
  if (lastSegment) {
    return await queryCollection('products')
      .where('path', 'LIKE', `%${lastSegment}%`)
      .first()
  }
  
  return null
})

// 监听路由，确保点击不同型号能刷新
watch(() => route.path, () => refresh())
</script>

<template>
  <main class="max-w-4xl mx-auto p-6">
    <div v-if="pending" class="py-20 text-center">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
    </div>

    <div v-else-if="product">
      <nav class="mb-6 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-orange-600">Home</NuxtLink> / 
        <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
      </nav>
      
      <article class="prose lg:prose-xl max-w-none">
        <ContentRenderer :value="product" />
      </article>
    </div>

    <div v-else class="bg-amber-50 p-10 rounded-2xl border border-amber-200 text-center">
      <h2 class="text-2xl font-bold text-amber-800 mb-2">Technical Specs Updating...</h2>
      <p class="text-amber-700 mb-6">We couldn't find the specific data for: <code class="bg-white px-2 py-1 rounded">{{ route.path }}</code></p>
      <NuxtLink to="/products" class="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg">
        Back to Product List
      </NuxtLink>
    </div>
  </main>
</template>