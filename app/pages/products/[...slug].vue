<script setup lang="ts">
const route = useRoute()

// 1. 处理路径：转小写，去掉末尾斜杠
const cleanPath = route.path.replace(/\/$/, '').toLowerCase()

// 2. 查询数据
// 注意：key 必须唯一，否则不同产品间切换会显示旧数据
const { data: product, pending } = await useAsyncData(`prod-${cleanPath}`, () => {
  return queryCollection('products')
    .path(cleanPath)
    .first()
})

// 3. 调试数据：建议使用 watch，这样当数据从 null 变成有值时，你会立即在控制台看到
watch(product, (newVal) => {
  console.log('--- 调试信息 ---')
  console.log('当前查询路径:', cleanPath)
  console.log('获取到的数据:', newVal)
}, { immediate: true })

// 4. 设置 SEO
useSeoMeta({
  title: () => product.value?.title || 'Product Details',
  description: () => product.value?.description || 'Loading...'
})
</script>

<template>
  <div class="product-detail">
    <!-- 增加一个简单的判断，方便在页面上直接调试 -->
    <div v-if="pending">加载中...</div>
    <div v-else-if="product">
      <h1>{{ product.title }}</h1>
      <ContentRenderer :value="product" />
    </div>
    <div v-else class="error">
      <p>未找到路径为 {{ cleanPath }} 的产品内容。</p>
      <p>请检查 content/products/ 目录下是否存在对应的 .md 文件。</p>
    </div>
  </div>
</template>