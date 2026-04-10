<script setup lang="ts">
const route = useRoute()

// 1. 格式化路径：转小写，去掉末尾斜杠
const cleanPath = route.path.replace(/\/$/, '').toLowerCase()

// 2. 一次性获取数据和所有路径清单（用于诊断）
const { data: result, pending } = await useAsyncData(`diag-${cleanPath}`, async () => {
  // 尝试 策略 A (直接路径) 和 策略 B (带 index 路径)
  let product = await queryCollection('products').path(cleanPath).first()
  
  if (!product) {
    product = await queryCollection('products').path(`${cleanPath}/index`).first()
  }

  // 获取所有文件清单，帮我们排查“数据库是否为空”
  const all = await queryCollection('products').all()
  
  return { product, all }
})

// 计算属性：简化模板引用
const product = computed(() => result.value?.product)
const allPaths = computed(() => result.value?.all?.map(i => i.path) || [])
</script>

<template>
  <main class="max-w-4xl mx-auto p-8">
    <!-- 加载状态 -->
    <div v-if="pending" class="text-center py-10">
      <div class="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p class="mt-2 text-gray-500">正在检索拖拉机数据...</p>
    </div>
    
    <!-- 成功渲染内容 -->
    <div v-else-if="product" class="prose lg:prose-xl mx-auto">
      <h1>{{ product.title }}</h1>
      <ContentRenderer :value="product" />
    </div>

    <!-- 🚨 诊断报告 (仅在找不到内容时显示) -->
    <div v-else class="bg-red-50 p-6 border-2 border-dashed border-red-400 rounded-lg">
      <h2 class="text-red-600 font-bold mb-2 text-xl">🚨 内容未找到</h2>
      <p class="mb-4">我们尝试在数据库中查找路径：<code>{{ cleanPath }}</code></p>
      
      <div class="mt-4 p-4 bg-white rounded border border-red-200">
        <p class="font-bold text-gray-700 mb-2">
          目前数据库中已识别的路径 (共 {{ allPaths.length }} 个):
        </p>
        
        <ul v-if="allPaths.length > 0" class="space-y-1">
          <li v-for="p in allPaths" :key="p" class="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {{ p }}
          </li>
        </ul>
        
        <div v-else class="text-red-500 flex items-center gap-2 py-4">
          <span>❌</span>
          <p class="font-bold">数据库竟然是空的！Nuxt Content 没有扫描到任何文件。</p>
        </div>
      </div>
      
      <div class="mt-6 text-sm text-gray-600 border-t pt-4">
        <p class="font-bold mb-1">接下来的排查建议：</p>
        <ol class="list-decimal ml-5 space-y-1">
          <li>确认 <code>content/products/tractor/index.md</code> 文件确实在 GitHub 根目录。</li>
          <li>确认 <code>content.config.ts</code> 里的 <code>source</code> 设置为了 <code>'**/*.md'</code>。</li>
          <li>等 Vercel 配额恢复后，重新部署并点击 "Reset Cache"。</li>
        </ol>
      </div>
    </div>
  </main>
</template>