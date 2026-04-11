<script setup lang="ts">
const route = useRoute()

// 统一将路径处理为全小写，并去掉末尾斜杠
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // 1. 获取当前页面数据（逻辑：不管路径是大写还是小写，通通按小写去查数据库）
  const page = await queryCollection('products')
    .path(cleanPath.value)
    .first()
  
  // 2. 抓取该路径下的所有子内容
  const allSubContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  // 3. 筛选下一层级（逻辑：找直接下级文件，或子文件夹的 index.md）
  const subProducts = allSubContent.filter(item => {
    const relativePath = item.path.toLowerCase().replace(cleanPath.value + '/', '')
    const parts = relativePath.split('/')
    
    // 如果 parts.length 为 1，说明是当前目录下的单品文件（非 index）
    // 如果 parts.length 为 2 且结尾是 index，说明是子分类文件夹
    return (parts.length === 1 && !relativePath.includes('index')) || 
           (parts.length === 2 && parts[1] === 'index')
  })

  return { page, subProducts }
}, { watch: [() => route.path] })

watch(() => route.path, () => refresh())
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div v-if="pending" class="text-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
    </div>

    <div v-else-if="result?.page">
      <article class="prose prose-orange max-w-none mb-16">
        <ContentRenderer :value="result.page" />
      </article>

      <div v-if="result.subProducts?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="item in result.subProducts" 
          :key="item.path"
          :to="item.path"
          class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
        >
          <div class="aspect-video overflow-hidden bg-gray-100 relative">
            <img 
              :src="item.image || '/img/tractor/P80.png'" 
              :alt="item.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div v-if="item.path.endsWith('/index')" class="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
              CATEGORY
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm line-clamp-2">
              {{ item.description }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-bold text-gray-900">Content Not Found</h2>
      <p class="mt-2 text-gray-600">Please check the URL or return to homepage.</p>
      <NuxtLink to="/" class="mt-6 inline-block text-orange-600 hover:underline">Back to Home</NuxtLink>
    </div>
  </div>
</template>