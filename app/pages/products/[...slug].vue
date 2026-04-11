<script setup lang="ts">
const route = useRoute()

// 1. 获取所有可能的路径变体
const getTries = (p: string) => {
  const clean = p.replace(/\/$/, '')
  return [
    clean, 
    clean.toLowerCase(), 
    clean.charAt(0).toUpperCase() + clean.slice(1),
    `${clean}/index`,
    `${clean.toLowerCase()}/index`
  ]
}

const { data: product, pending, refresh } = await useAsyncData(`prod-${route.path}`, async () => {
  const tries = getTries(route.path)
  
  // 核心修正：利用 LIKE 运算符忽略大小写查找
  // 这能解决 Tractor 还是 tractor 的问题
  const lastSegment = route.path.split('/').filter(Boolean).pop()
  
  // 优先精确查找
  for (const t of tries) {
    const doc = await queryCollection('products').path(t).first()
    if (doc) return doc
  }

  // 保底：通过标题或路径片段模糊查找
  if (lastSegment) {
    return await queryCollection('products')
      .where('path', 'LIKE', `%${lastSegment.toLowerCase()}%`)
      .first()
  }
  
  return null
})

watch(() => route.path, () => refresh())
</script>

<template>
  <main class="max-w-4xl mx-auto p-6 md:p-12 min-h-[60vh]">
    <div v-if="pending" class="text-center py-20">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
    </div>

    <div v-else-if="product">
      <nav class="mb-8 text-sm flex items-center gap-2">
        <NuxtLink to="/" class="text-gray-500 hover:text-orange-600 transition-colors">Home</NuxtLink>
        <span class="text-gray-300">/</span>
        <NuxtLink to="/products" class="text-gray-500 hover:text-orange-600 transition-colors">Products</NuxtLink>
        <span class="text-gray-300">/</span>
        <span class="text-gray-900 font-bold">{{ product.title }}</span>
      </nav>

      <article class="prose prose-orange lg:prose-xl max-w-none bg-white">
        <h1 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          {{ product.title }}
        </h1>
        <ContentRenderer :value="product" />
      </article>
    </div>

    <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
      <div class="text-6-xl mb-4">🚜</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Specifications Not Loaded</h2>
      <p class="text-gray-500 mb-8">We are synchronizing the data for: <span class="font-mono text-orange-600">{{ route.path }}</span></p>
      <NuxtLink to="/products" class="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg">
        View All Machinery
      </NuxtLink>
    </div>
  </main>
</template>