<script setup lang="ts">
const route = useRoute()

// 1. 标准化路径：转小写、去末尾斜杠
const cleanPath = computed(() => route.path.replace(/\/$/, '').toLowerCase())

// 2. 异步获取数据
const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // A. 获取当前页面的主内容 (index.md 或 型号.md)
  const page = await queryCollection('products').path(cleanPath.value).first()
  
  // B. 尝试获取子产品 (如果是分类页，去找下面的 5 个型号)
  const subProducts = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .where('path', '!=', cleanPath.value) // 排除掉 index 自己
    .all()

  return { page, subProducts }
})

// 监听路由变化，确保点击不同产品能刷新
watch(() => route.path, () => refresh())
</script>

<template>
  <main class="max-w-7xl mx-auto p-4 md:p-12 min-h-screen bg-white">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
    </div>

    <div v-else>
      <div v-if="result?.subProducts && result.subProducts.length > 0">
        <div class="mb-12 text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
            {{ result.page?.title || 'Our Machinery Range' }}
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ result.page?.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
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
              <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-orange-600 font-bold">
                <span>View Specs</span>
                <span class="transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="result?.page" class="max-w-4xl mx-auto">
        <nav class="flex gap-2 text-sm text-gray-400 mb-8 items-center">
          <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
          <span>/</span>
          <span class="text-gray-900 font-medium">{{ result.page.title }}</span>
        </nav>

        <article class="prose prose-orange lg:prose-