<script setup lang="ts">
const route = useRoute()

// 1. 统一处理路径：转小写，并去掉末尾斜杠
// 这样无论用户访问 /Tractor 还是 /tractor，我们都去查同一个文件
const cleanPath = route.path.replace(/\/$/, '').toLowerCase()

const { data: product, pending, error } = await useAsyncData(`prod-${cleanPath}`, () => {
  return queryCollection('products')
    .path(cleanPath) // 关键：确保此路径与 .md 文件的实际路径一致
    .first()
})

// 调试用：如果页面还是空的，可以在浏览器控制台看这个打印
console.log('Searching for path:', cleanPath)
console.log('Result:', product.value)

// 设置 SEO
useSeoMeta({
  title: () => product.value?.title || 'Product Details',
  description: () => product.value?.description
})
</script>