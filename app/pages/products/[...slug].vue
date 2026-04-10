<script setup lang="ts">
const route = useRoute()

// 1. 获取清洗后的路径（全小写，去掉末尾斜杠）
const cleanPath = route.path.replace(/\/$/, '').toLowerCase()

const { data: product, pending } = await useAsyncData(`content-${cleanPath}`, async () => {
  // 策略 A: 尝试 /products/tractor
  let res = await queryCollection('products').path(cleanPath).first()
  
  // 策略 B: 尝试 /products/tractor/index (有些版本会这样解析)
  if (!res) {
    res = await queryCollection('products').path(`${cleanPath}/index`).first()
  }

  return res
})
</script>

<template>
  <div class="product-page">
    <div v-if="pending" class="p-10 text-center">Loading...</div>

    <div v-else-if="product">
      <article class="prose max-w-4xl mx-auto p-6">
        <h1>{{ product.title }}</h1>
        <!-- 渲染内容 -->
        <ContentRenderer :value="product" />
      </article>
    </div>

    <!-- 如果失败，显示的诊断信息 -->
    <div v-else class="m-10 p-6 bg-red-50 border border-red-200 rounded">
      <h2 class="text-red-600 font-bold">内容未找到</h2>
      <p class="text-sm mt-2">尝试查询的路径: <strong>{{ cleanPath }}</strong></p>
      <hr class="my-4" />
      <p class="text-xs text-gray-500">
        提示：请检查 GitHub 仓库根目录下的 <code>content/products/tractor/index.md</code> 是否存在，
        且文件开头是否有 <code>---</code> 包围的元数据。
      </p>
    </div>
  </div>
</template>