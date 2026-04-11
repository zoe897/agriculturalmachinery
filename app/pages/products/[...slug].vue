<script setup lang="ts">
const route = useRoute()

// 1. 获取纯净路径：小写、无斜杠
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // A. 先找当前的 index.md 或详情页
  const page = await queryCollection('products').path(cleanPath.value).first()
  
  // B. 核心改动：寻找子产品
  // 逻辑：只要路径里包含 "/tractor/" (不分大小写) 且不是 index 自身，就全列出来
  const subProducts = await queryCollection('products')
    .where('path', 'LIKE', `%${cleanPath.value}/%`)
    .where('path', 'NOT LIKE', '%index%')
    .all()

  return { page, subProducts }
}, { watch: [() => route.path] })

watch(() => route.path, () => refresh())
</script>

<template>
  <main class="max-w-7xl mx-auto p-4 md:p-12 min-h-screen">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
    </div>

    <div v-else>
      <div v-if="result?.subProducts && result.subProducts.length > 0">
        <div class="mb-12 text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
            {{ result.page?.title || 'Heavy Duty Tractors' }}
          </h1>
          <p class="text-gray-500 max-w-2xl mx-auto text-lg">
            {{ result.page?.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <div class="aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                :src="item.image || '/img/placeholder.jpg'" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-gray-400 text-sm mt-3 line-clamp-2">{{ item.description }}</p>
              <div class="mt-6 flex items-center text-orange-600 font-bold gap-2">
                Check Tech Specs <span>→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="result?.page" class="max-w-4xl mx-auto">
        <nav class="flex gap-2 text-sm text-gray-400 mb-10 items-center">
          <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
          <span>/</span>
          <NuxtLink to="/products/tractor" class="hover:text-orange-600">Tractors</NuxtLink>
          <span>/</span>
          <span class="text-gray-900">{{ result.page.title }}</span>
        </nav>

        <article class="prose prose-orange lg:prose-xl max-w-none bg-white">
          <ContentRenderer :value="result.page" />
        </article>
      </div>
    </div>
  </main>
</template>

<style>
/* 详情页样式优化 */
.prose img {
  @apply rounded-3xl shadow-2xl my-10 border border-gray-100;
  width: 100% !important;
}
.prose table {
  @apply w-full my-8 border-collapse;
  display: block;
  overflow-x: auto;
}
.prose th { @apply bg-gray-50 p-4 border border-gray-200 text-left font-bold; }
.prose td { @apply p-4 border border-gray-100; }
</style>