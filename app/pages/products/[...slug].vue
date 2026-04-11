<script setup lang="ts">
const route = useRoute()

// 1. 获取当前页面的内容（比如 Tractor 的介绍）
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('products').path(route.path.replace(/\/$/, '').toLowerCase()).first()
})

// 2. 获取该目录下的所有产品（比如 TTB904, TTE500 等）
const { data: subProducts } = await useAsyncData(`sub-${route.path}`, () => {
  const cleanPath = route.path.replace(/\/$/, '').toLowerCase()
  return queryCollection('products')
    .where('path', 'LIKE', `${cleanPath}/%`)
    .where('path', 'NOT LIKE', '%index%') // 排除掉 index 自己
    .all()
})
</script>

<template>
  <main class="max-w-6xl mx-auto p-6 md:p-12">
    <section v-if="page" class="mb-12 border-b pb-8">
      <h1 class="text-4xl font-extrabold text-gray-900 mb-4">{{ page.title }}</h1>
      <article class="prose max-w-none text-gray-600">
        <ContentRenderer :value="page" />
      </article>
    </section>

    <div v-if="subProducts && subProducts.length > 0">
      <h2 class="text-2xl font-bold mb-8">Available Models</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="item in subProducts" 
          :key="item.path"
          :to="item.path"
          class="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
        >
          <div class="aspect-video bg-gray-100 overflow-hidden">
            <img 
              :src="item.image || '/images/placeholder-tractor.jpg'" 
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 group-hover:text-orange-600">{{ item.title }}</h3>
            <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ item.description }}</p>
            <div class="mt-4 text-orange-600 font-semibold flex items-center gap-2">
              View Specifications <span>→</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-if="!subProducts || subProducts.length === 0" class="mt-8">
       </div>
  </main>
</template>
<div v-if="!subProducts || subProducts.length === 0" class="mt-8">
  <article class="prose prose-orange lg:prose-xl max-w-none bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
    <ContentRenderer :value="product" />
  </article>

  <div class="mt-12 p-10 bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-3xl shadow-xl">
    <div class="md:flex items-center justify-between">
      <div>
        <h3 class="text-3xl font-bold mb-2">Request Technical Specs</h3>
        <p class="text-blue-100">Contact Zoe for the latest FOB prices and container loading plans.</p>
      </div>
      <a href="mailto:zoe@annetop.com" class="mt-6 md:mt-0 inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105">
        Get a Quote Now
      </a>
    </div>
  </div>
</div>