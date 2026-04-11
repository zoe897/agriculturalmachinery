<script setup lang="ts">
const route = useRoute()

// 1. 标准化路径：处理大小写并去掉末尾斜杠
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

// 2. 获取数据
const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  const page = await queryCollection('products').path(cleanPath.value).first()
  
  // 查找子产品（分类页用）
  const subProducts = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
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
          <h1 class="text-4xl font-black text-gray-900 mb-4">{{ result.page?.title || 'Machinery Range' }}</h1>
          <p class="text-xl text-gray-500 max-w-3xl mx-auto">{{ result.page?.description }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
          >
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden">
              <img 
                :src="item.image || '/img/placeholder.png'" 
                :alt="item.title"
                class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600">{{ item.title }}</h3>
              <p class="text-gray-500 line-clamp-2 mb-6 text-sm">{{ item.description }}</p>
              <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-orange-600 font-bold">
                <span>View Details</span>
                <span>→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="result?.page" class="max-w-5xl mx-auto">
        <nav class="flex gap-2 text-sm text-gray-400 mb-8 items-center font-medium bg-gray-50 p-4 rounded-2xl">
          <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
          <span>/</span>
          <span class="text-gray-900 font-bold">{{ result.page.title }}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div class="rounded-3xl overflow-hidden shadow-xl bg-gray-50 border border-gray-100 aspect-square">
            <img :src="result.page.image || '/img/placeholder.png'" class="w-full h-full object-contain p-6" />
          </div>

          <div class="flex flex-col justify-center">
            <h1 class="text-4xl font-black text-gray-900 mb-6">{{ result.page.title }}</h1>
            <p class="text-xl text-gray-600 mb-8 border-l-4 border-orange-500 pl-4">{{ result.page.description }}</p>
            <a href="mailto:zoe@annetop.com" class="inline-block text-center bg-orange-600 hover:bg-black text-white text-xl font-bold py-5 px-10 rounded-2xl shadow-lg transition-all">
              Request Quotation Now
            </a>
          </div>
        </div>

        <div class="border-t border-gray-100 pt-16">
          <article class="prose prose-orange lg:prose-xl max-w-none">
            <ContentRenderer :value="result.page" />
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* 针对表格和 Markdown 图片的深度优化 */
.prose :deep(table) { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.9em; }
.prose :deep(th) { background-color: #f9fafb; padding: 12px; border: 1px solid #e5e7eb; }
.prose :deep(td) { padding: 12px; border: 1px solid #e5e7eb; }
.prose :deep(img) { border-radius: 1.5rem; margin: 2rem auto; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
</style>