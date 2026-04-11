<script setup lang="ts">
const route = useRoute()
const getCleanPath = (path: string) => path.replace(/\/$/, '').toLowerCase()

const { data: product, refresh } = await useAsyncData(`prod-${route.path}`, async () => {
  const cleanPath = getCleanPath(route.path)
  // 1. 优先找型号文件
  let doc = await queryCollection('products').path(cleanPath).first()
  // 2. 找不到则找目录首页
  if (!doc) {
    doc = await queryCollection('products').path(`${cleanPath}/index`).first()
  }
  return doc
})

watch(() => route.path, () => refresh())
</script>

<template>
  <main class="max-w-4xl mx-auto p-6 md:p-12">
    <div v-if="product">
      <nav class="mb-8 text-sm flex gap-2">
        <NuxtLink to="/" class="text-blue-600">Home</NuxtLink>
        <span>/</span>
        <NuxtLink to="/products/tractor" class="text-blue-600">Tractors</NuxtLink>
      </nav>

      <article class="prose lg:prose-xl max-w-none shadow-sm p-4 rounded-lg">
        <ContentRenderer :value="product" />
      </article>
      
      <div class="mt-12 p-8 bg-blue-900 text-white rounded-2xl text-center">
        <h3 class="text-2xl font-bold mb-4">Interested in {{ product.title }}?</h3>
        <p class="mb-6 opacity-90">Get a professional quote and technical support within 24 hours.</p>
        <NuxtLink to="/contact" class="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all">
          Contact Us Now
        </NuxtLink>
      </div>
    </div>
    <div v-else class="py-20 text-center">
      <h2 class="text-2xl font-bold text-gray-400">Loading Product Specifications...</h2>
      <p class="text-gray-400 mt-2">If not redirected, please check the URL.</p>
    </div>
  </main>
</template>