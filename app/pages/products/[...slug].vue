<script setup lang="ts">
const route = useRoute()

// 1. 标准化路径
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

// 2. 异步获取数据
const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  const page = await queryCollection('products').path(cleanPath.value).first()
  
  const subProducts = await queryCollection('products')
    .where('path', 'LIKE', `%${cleanPath.value}/%`)
    .where('path', 'NOT LIKE', '%index%')
    .all()

  return { page, subProducts }
}, { watch: [() => route.path] })

watch(() => route.path, () => refresh())
</script>

<template>
  <main class="max-w-7xl mx-auto p-4 md:p-12 min-h-screen bg-white">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
    </div>

    <div v-else>
      <div v-if="result?.subProducts && result.subProducts.length > 0">
        <div class="mb-12 text-center">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-4">
            {{ result.page?.title || 'Our Machinery Range' }}
          </h1>
          <p class="text-xl text-gray-500 max-w-3xl mx-auto">
            {{ result.page?.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
          >
            <div class="aspect-[4/3] overflow-hidden bg-gray-100">
              <img 
                :src="item.image || '/img/placeholder.png'" 
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600">
                {{ item.title }}
              </h3>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ item.description }}</p>
              <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-orange-600 font-bold">
                <span>View Details</span>
                <span>→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="result?.page" class="max-w-4xl mx-auto">
        <nav class="flex gap-2 text-sm text-gray-400 mb-8 items-center font-medium">
          <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
          <span>/</span>
          <span class="text-gray-900">{{ result.page.title }}</span>
        </nav>

        <article class="prose prose-orange lg:prose-xl max-w-none">
          <ContentRenderer :value="result.page" />
        </article>

        <div class="mt-16 p-10 bg-gray-900 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-2">Interested in this model?</h3>
            <p class="text-gray-400">Contact Zoe for full catalogs and FOB prices.</p>
          </div>
          <a href="mailto:zoe@annetop.com" class="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold transition-all">
            Contact Zoe
          </a>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-400 text-lg">Machinery data is loading or not found.</p>
        <NuxtLink to="/products" class="mt-4 inline-block text-orange-600 font-bold underline">Back to Products</NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.prose :deep(img) {
  display: block;
  width: 100% !important;
  max-width: 100%;
  height: auto;
  margin: 2.5rem auto;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.prose :deep(table) {
  width: 100%;
  margin: 2rem 0;
  border-collapse: collapse;
  display: block;
  overflow-x: auto;
}

.prose :deep(th) {
  background-color: #f9fafb;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.prose :deep(td) {
  padding: 1rem;
  border: 1px solid #f3f4f6;
}
</style>