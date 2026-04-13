<script setup lang="ts">
const route = useRoute()

// 统一路径格式：全小写并去掉末尾斜杠
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // 1. 获取当前页面（或分类 index）的详细数据
  const page = await queryCollection('products')
    .path(cleanPath.value)
    .first()
  
  // 2. 深度探测该路径下的所有内容（包含子文件夹）
  const allSubContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  // 3. 核心筛选逻辑：只找直接下级文件，或直接下级子目录的 index.md
  const subProducts = allSubContent.filter(item => {
    const relativePath = item.path.toLowerCase().replace(cleanPath.value + '/', '')
    const parts = relativePath.split('/')
    
    // 情况 A: 当前目录下的具体产品文件 (例如: tractor/ttb904.md)
    const isDirectFile = parts.length === 1 && !relativePath.includes('index')
    // 情况 B: 下一级分类的入口文件 (例如: tillage/index.md)
    const isDirectSubFolder = parts.length === 2 && parts[1] === 'index'
    
    return isDirectFile || isDirectSubFolder
  })

  return { page, subProducts }
}, { watch: [() => route.path] })

// 监听路径变化，确保在不同分类间切换时即时刷新
watch(() => route.path, () => refresh())
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8 md:py-12">
    <div v-if="pending" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>

    <div v-else-if="result?.page">
      <nav class="flex mb-8 text-sm font-medium text-gray-500">
        <NuxtLink to="/" class="hover:text-orange-600 transition">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-orange-600 transition">Products</NuxtLink>
        <span v-if="!cleanPath.endsWith('/products')" class="flex">
          <span class="mx-2">/</span>
          <span class="text-orange-600 truncate max-w-[150px]">{{ result.page.title }}</span>
        </span>
      </nav>

      <div v-if="!cleanPath.endsWith('index') && !cleanPath.endsWith('/products')" class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div class="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-lg group">
          <img 
            :src="result.page.image || '/img/tractor/P80.png'" 
            class="w-full h-auto object-contain min-h-[350px] transform group-hover:scale-105 transition-transform duration-700"
            :alt="result.page.title"
          />
        </div>
        <div class="flex flex-col justify-center">
          <div class="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-orange-600 uppercase bg-orange-100 rounded-full w-fit">
            Export Grade Machinery
          </div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{{ result.page.title }}</h1>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            {{ result.page.description || 'Professional agricultural solution with 16 years of industry expertise.' }}
          </p>
          <div class="space-y-4">
            <a href="mailto:zoe@annetop.com" class="flex items-center justify-center w-full bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95">
              Get Technical Specifications
            </a>
            <p class="text-center text-sm text-gray-400">Response within 12 hours | Support LCL Consolidation</p>
          </div>
        </div>
      </div>

      <div v-else class="mb-12">
        <h1 class="text-4xl font-black text-gray-900 mb-4">{{ result.page.title }}</h1>
        <p class="text-gray-600 max-w-2xl">{{ result.page.description }}</p>
        <div class="h-1.5 w-24 bg-orange-600 mt-6 rounded-full"></div>
      </div>

      <article class="prose prose-orange prose-lg max-w-none mb-16 bg-white p-6 md:p-10 rounded-2xl border border-gray-100">
        <ContentRenderer :value="result.page" />
      </article>

      <div v-if="result.subProducts?.length" class="border-t border-gray-100 pt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-10 flex items-center">
          <span class="mr-3">Explore Categories & Models</span>
          <span class="flex-grow h-px bg-gray-100"></span>
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-50 flex flex-col"
          >
            <div class="aspect-[4/3] overflow-hidden bg-gray-50 relative">
              <img 
                :src="item.image || '/img/tractor/P80.png'" 
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div v-if="item.path.endsWith('/index')" class="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-md">
                CATEGORY
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                {{ item.title }}
              </h3>
              <p class="text-gray-500 text-sm mt-2 line-clamp-2 leading-snug">
                {{ item.description }}
              </p>
              <div class="mt-4 flex items-center text-orange-600 font-bold text-sm">
                View Details
                <span class="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
      <h2 class="text-3xl font-bold text-gray-900">Information Pending</h2>
      <p class="mt-4 text-gray-600">The requested machinery details are being updated by our team.</p>
      <NuxtLink to="/products" class="mt-8 inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
        Return to Catalog
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
/* 优化 Markdown 里的表格显示 */
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
}
:deep(th) {
  background-color: #fff7ed;
  color: #c2410c;
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #fdba74;
}
:deep(td) {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}
</style>