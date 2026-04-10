<script setup lang="ts">
const route = useRoute()
const cleanPath = route.path.replace(/\/$/, '').toLowerCase()

// 1. 同时查询目标文件和所有文件清单（用于诊断）
const { data: result, pending } = await useAsyncData(`diag-${cleanPath}`, async () => {
  const [product, all] = await Promise.all([
    queryCollection('products').path(cleanPath).first(),
    queryCollection('products').all() // 获取所有已扫描的文件
  ])
  return { product, all }
})

const product = computed(() => result.value?.product)
const allPaths = computed(() => result.value?.all?.map(i => i.path) || [])
</script>

<template>
  <main class="p-8">
    <div v-if="pending">Loading...</div>
    
    <div v-else-if="product">
      <h1>{{ product.title }}</h1>
      <ContentRenderer :value="product" />
    </div>

    <!-- 调试诊断区域 -->
    <div v-else class="bg-gray-100 p-6 border-2 border-dashed border-red-400">
      <h2 class="text-red-600 font-bold mb-2">🚨 诊断报告</h2>
      <p>当前访问路径: <code>{{ cleanPath }}</code></p>
      
      <div class="mt-4">
        <p class="font-bold">目前数据库中存在的所有路径 ({{ allPaths.length }} 个):</p>
        <ul v-if="allPaths.length > 0" class="list-disc ml-5 bg-white p-2">
          <li v-for="p in allPaths" :key="p"><code>{{ p }}</code></li>
        </ul>
        <p v-else class="text-red-500 italic">数据库竟然是空的！Nuxt 完全没看到你的 content 文件夹。</p>
      </div>
      
      <div class="mt-4 text-sm text-gray-600">
        <strong>建议检查：</strong>
        <p>1. 你的 content 文件夹是否在项目的【最顶层】根目录（与 package.json 同级）？</p>
        <p>2. Vercel 部署日志里是否有 Content 相关的 Error？</p>
      </div>
    </div>
  </main>
</template>