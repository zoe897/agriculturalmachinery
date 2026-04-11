<script setup lang="ts">
const route = useRoute()

// 1. 格式化路径
const cleanPath = route.path.replace(/\/$/, '').toLowerCase()

// 2. 获取数据：当前产品、同目录下的其他产品（用于列表）
const { data: result, pending } = await useAsyncData(`content-${cleanPath}`, async () => {
  // 查找当前页面内容
  let product = await queryCollection('products').path(cleanPath).first()
  if (!product) {
    product = await queryCollection('products').path(`${cleanPath}/index`).first()
  }

  // 获取数据库所有路径（用于诊断）
  const all = await queryCollection('products').all()

  // 进阶：如果你在分类页（比如 /products/tractor），自动找该目录下所有型号
  // 如果你在详情页（比如 /products/tractor/ttb904），找它的兄弟产品
  const parentPath = cleanPath.split('/').slice(0, -1).join('/')
  const related = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath}%`) 
    .all()

  return { product, all, related }
})

const product = computed(() => result.value?.product)
const allPaths = computed(() => result.value?.all?.map(i => i.path) || [])

// 排除掉当前的 index 页面，剩下的就是具体的型号列表
const subModels = computed(() => {
  return result.value?.related?.filter(item => item.path !== cleanPath && item.path !== `${cleanPath}/index`) || []
})
</script>

<template>
  <main class="max-w-4xl mx-auto p-6 md:p-12">
    <div v-if="pending" class="text-center py-20">
      <div class="animate-spin inline-block w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      <p class="mt-4 text-gray-500 font-medium">Loading technical specifications...</p>
    </div>
    
    <div v-else-if="product">
      <nav class="mb-8 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-orange-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products/tractor" class="hover:text-orange-600">Products</NuxtLink>
        <span v-if="cleanPath !== '/products/tractor'" class="mx-2">/</span>
        <span class="text-gray-900 font-bold">{{ product.title }}</span>
      </nav>

      <article class="prose prose-orange lg:prose-xl max-w-none">
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          {{ product.title }}
        </h1>
        
        <ContentRenderer :value="product" />
      </article>

      <div v-if="subModels.length > 0" class="mt-16 pt-8 border-t border-gray-200">
        <h3 class="text-xl font-bold mb-6 text-gray-800">Related Models & Series</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NuxtLink 
            v-for="model in subModels" 
            :key="model.path"
            :to="model.path"
            class="p-4 border border-gray-100 rounded-lg hover:border-orange-500 hover:shadow-md transition-all group"
          >
            <div class="font-bold text-gray-900 group-hover:text-orange-600">{{ model.title }}</div>
            <div class="text-sm text-gray-500 line-clamp-1">{{ model.description }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="bg-red-50 p-6 border-2 border-dashed border-red-400 rounded-lg">
      <h2 class="text-red-600 font-bold mb-2">🚨 Path Not Found</h2>
      <p>Current Path: <code>{{ cleanPath }}</code></p>
      <div class="mt-4 p-4 bg-white rounded text-xs font-mono">
        <p class="font-bold mb-2">Available Database Paths:</p>
        <div v-for="p in allPaths" :key="p">{{ p }}</div>
      </div>
    </div>
  </main>
</template>

<style>
/* 让 Markdown 里的表格更好看 */
.prose table {
  @apply w-full border-collapse border border-gray-200 text-sm;
}
.prose th, .prose td {
  @apply border border-gray-200 p-2 text-left;
}
.prose th {
  @apply bg-gray-50;
}
</style>