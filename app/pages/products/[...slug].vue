<script setup lang="ts">
const route = useRoute()

// 1. 标准化路径：转小写、去末尾斜杠
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

// 2. 异步获取数据
const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // A. 获取当前页内容 (例如 tractor 目录下的 index.md)
  const page = await queryCollection('products').path(cleanPath.value).first()
  
  // B. 获取子产品 (例如 tractor 目录下的 ttb904.md 等)
  // 逻辑：只要路径里包含当前路径且不是 index 自身，就视为子型号
  const subProducts = await queryCollection('products')
    .where('path', 'LIKE', `%${cleanPath.value}/%`)
    .where('path', 'NOT LIKE', '%index%')
    .all()

  return { page, subProducts }
}, { watch: [() => route.path] })

// 监听路由变化刷新数据
watch(() => route.path, () => refresh())
</script>

<template>
  <main class="max-w-7xl mx-auto p-4 md:p-12 min-h-screen bg-white">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
    </div>

    <div v-else>
      <div v-if="result?.subProducts && result.subProducts.length > 0">
        <div class="mb-12 text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
            {{ result.page?.title || 'Our Machinery Range' }}
          </h1>
          <p class="text-xl text-gray-500 max-w-3xl mx-auto">
            {{ result.page?.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <div class="aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                :src="item.image || '/img/placeholder.png'" 
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ item.description }}</p>
              <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-orange-600 font-bold">
                <span>View Details</span>
                <span class="transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>