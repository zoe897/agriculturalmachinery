<script setup lang="ts">
const route = useRoute()

// 1. 规范化当前路径
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

// 2. 异步获取数据
const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // 获取当前页面的元数据
  const page = await queryCollection('products').path(cleanPath.value).first()
  
  // 核心逻辑：获取所有以当前路径开头的子文件
  const allSubContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  // 3. 精确过滤下一层级（只找儿子，不找孙子）
  const subProducts = allSubContent.filter(item => {
    // 移除当前路径前缀
    const relativePath = item.path.replace(cleanPath.value + '/', '')
    // 如果相对路径中不再包含 "/"，说明它是直接下一层的文件或文件夹的 index
    // 同时排除掉那些叫 index 的具体路径，只保留它们的父级路径展示
    const parts = relativePath.split('/')
    
    // 如果 parts.length 为 1，说明是直接子级
    // 如果该子级是以 index 命名的 md，那它代表的就是这个文件夹本身
    return parts.length === 1 && !item.path.endsWith('index')
  })

  // 特殊补充：如果当前层级有文件夹（例如 tillage/index.md），上面的逻辑会漏掉
  // 我们手动补齐当前目录下所有的 index 文件（除了自己）
  const directoryIndexes = allSubContent.filter(item => {
    const relativePath = item.path.replace(cleanPath.value + '/', '')
    const parts = relativePath.split('/')
    return parts.length === 2 && parts[1] === 'index'
  })

  // 合并结果：直接产品 + 文件夹索引
  const combinedSubs = [...subProducts, ...directoryIndexes]

  return { page, subProducts: combinedSubs }
}, { watch: [() => route.path] })

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
          <h1 class="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">
            {{ result.page?.title || 'Machinery Range' }}
          </h1>
          <div class="w-24 h-2 bg-orange-600 mx-auto mb-6"></div>
          <p class="text-xl text-gray-500 max-w-3xl mx-auto">{{ result.page?.description }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path.replace('/index', '')"
            class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
          >
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden relative">
              <img 
                v-if="item.image"
                :src="item.image" 
                :alt="item.title"
                class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
              />
              <div v-if="item.path.endsWith('/index')" class="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                CATEGORY
              </div>
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600">{{ item.title }}</h3>
              <p class="text-gray-500 line-clamp-2 mb-6 text-sm">{{ item.description }}</p>
              <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-orange-600 font-bold">
                <span>View Range</span>
                <span class="transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="result?.page" class="max-w-6xl mx-auto">
        <nav class="flex gap-2 text-sm text-gray-400 mb-10 items-center font-medium bg-gray-50 p-4 rounded-2xl">
          <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
          <span class="font-bold text-gray-900">/ {{ result.page.title }}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div class="rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 aspect-square flex items-center justify-center">
            <img v-if="result.page.image" :src="result.page.image" :alt="result.page.title" class="w-full h-full object-contain p-8" />
          </div>
          <div class="flex flex-col justify-center">
            <h1 class="text-5xl font-black text-gray-900 mb-8 leading-tight">{{ result.page.title }}</h1>
            <p class="text-2xl text-gray-600 border-l-8 border-orange-500 pl-6 mb-10">{{ result.page.description }}</p>
            <a href="mailto:zoe@annetop.com" class="inline-block text-center bg-orange-600 hover:bg-black text-white text-2xl font-black py-6 rounded-2xl shadow-xl transition-all">
              GET PRICE NOW
            </a>
          </div>
        </div>

        <div class="border-t-4 border-gray-900 pt-16">
          <article class="prose prose-orange lg:prose-xl max-w-none">
            <ContentRenderer :value="result.page" />
          </article>
        </div>
      </div>
    </div>
  </main>
</template>