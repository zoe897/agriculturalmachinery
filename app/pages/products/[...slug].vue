<script setup lang="ts">
const route = useRoute()

// 提取路径并清洗：转小写、去斜杠
const getCleanPath = (path: string) => path.replace(/\/$/, '').toLowerCase()

// 使用监视器，确保点击不同产品型号时，内容会跟着变
const { data: result, pending, refresh } = await useAsyncData(`content-${getCleanPath(route.path)}`, async () => {
  const cleanPath = getCleanPath(route.path)
  
  // 1. 尝试直接找文件 (如 ttb904.md)
  let product = await queryCollection('products').path(cleanPath).first()
  
  // 2. 尝试找 index 文件 (如 tractor/index.md)
  if (!product) {
    product = await queryCollection('products').path(`${cleanPath}/index`).first()
  }

  // 3. 找出同系列的所有型号 (用于导航)
  // 获取父级目录，比如从 /products/tractor/ttb904 提取出 /products/tractor
  const pathSegments = cleanPath.split('/')
  const isIndexPage = allPaths.value.includes(cleanPath + '/index') || cleanPath.endsWith('tractor') || cleanPath.endsWith('implement')
  
  // 这里的逻辑：如果是分类页，找子项；如果是详情页，找兄弟项
  const lookupPath = pathSegments.length > 3 ? pathSegments.slice(0, -1).join('/') : cleanPath
  
  const related = await queryCollection('products')
    .where('path', 'LIKE', `${lookupPath}%`)
    .all()

  const all = await queryCollection('products').all()
  
  return { product, related, all }
})

// 监听路由变化，解决点击型号不刷新的问题
watch(() => route.path, () => refresh())

const product = computed(() => result.value?.product)
const allPaths = computed(() => result.value?.all?.map(i => i.path) || [])
const subModels = computed(() => {
  const currentP = getCleanPath(route.path)
  return result.value?.related?.filter(item => 
    item.path !== currentP && 
    item.path !== `${currentP}/index` &&
    !item.path.endsWith('index')
  ) || []
})
</script>

<template>
  <main class="max-w-4xl mx-auto p-6 md:p-12">
    <div v-if="pending" class="text-center py-20">
      <div class="animate-spin inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
    </div>
    
    <div v-else-if="product">
      <nav class="mb-8 flex items-center gap-2 text-sm">
        <NuxtLink to="/" class="text-blue-600">Home</NuxtLink>
        <span class="text-gray-400">/</span>
        <NuxtLink to="/products/tractor" class="text-blue-600">Tractors</NuxtLink>
        <span v-if="!getCleanPath(route.path).endsWith('tractor')" class="text-gray-400">/</span>
        <span class="font-bold text-gray-800">{{ product.title }}</span>
      </nav>

      <article class="prose lg:prose-xl max-w-none">
        <h1 class="border-b pb-4">{{ product.title }}</h1>
        <ContentRenderer :value="product" />
      </article>

      <div v-if="subModels.length > 0" class="mt-12 p-6 bg-gray-50 rounded-xl">
        <h3 class="font-bold mb-4 text-gray-700 text-lg">More Models in this Series:</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NuxtLink 
            v-for="model in subModels" 
            :key="model.path"
            :to="model.path"
            class="block p-4 bg-white border rounded hover:shadow-md hover:border-blue-500 transition-all"
          >
            <div class="font-bold text-blue-700">{{ model.title }}</div>
            <div class="text-xs text-gray-500 line-clamp-1">{{ model.description }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="bg-red-50 p-6 border-2 border-dashed border-red-400">
      <h2 class="text-red-600 font-bold mb-2">🚨 Data Not Synced</h2>
      <p>Path: <code>{{ getCleanPath(route.path) }}</code></p>
      <p class="text-sm mt-2">如果您确认文件存在，请在 Vercel 重新部署并点击 "Clean Cache"。</p>
    </div>
  </main>
</template>