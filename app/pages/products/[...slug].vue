<script setup lang="ts">
const route = useRoute()
const cleanPath = computed(() => route.path.replace(/\/$/, ''))

const { data: result, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // 1. 优先找当前路径下的 index.md 或者具体的型号.md
  let page = await queryCollection('products').path(cleanPath.value).first()
  
  // 如果当前路径找不到（比如访问 /products/tractor），就尝试找 /products/tractor/index
  if (!page) {
    page = await queryCollection('products').path(`${cleanPath.value}/index`).first()
  }
  
  // 2. 获取该目录下的所有子项
  const allContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  // 3. 过滤：subProducts 只包含具体的型号，不包含 index 本身
  const subProducts = allContent.filter(item => {
    return !item.path.endsWith('/index')
  })

  return { page, subProducts }
}, { watch: [() => route.path] })

// 邮件发送逻辑
const contactMailto = computed(() => {
  const title = result.value?.page?.title || 'Machinery'
  return `mailto:zoe@annetop.com?subject=Inquiry for ${encodeURIComponent(title)}&body=Dear Zoe, I am interested in ${encodeURIComponent(title)}...`
})

watch(() => route.path, () => refresh())
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div v-if="result" class="max-w-7xl mx-auto px-4 py-10">
      
      <nav class="flex mb-8 text-sm font-medium text-gray-400">
        <NuxtLink to="/" class="hover:text-orange-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
      </nav>

      <div v-if="result.subProducts.length === 0 && result.page">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-start">
          <div class="bg-white rounded-3xl p-3 shadow-sm border border-gray-100">
            <img :src="result.page.image" class="w-full h-auto rounded-2xl object-contain bg-gray-50" />
          </div>
          <div class="flex flex-col pt-4">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-6">{{ result.page.title }}</h1>
            <p class="text-xl text-gray-500 mb-8">{{ result.page.description }}</p>
            <div class="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-orange-600">
              <h3 class="text-2xl font-bold mb-4">Factory Direct Quote</h3>
              <a :href="contactMailto" class="flex items-center justify-center bg-orange-600 text-white text-xl font-bold py-5 rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100">
                Contact Zoe for Price
              </a>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <article class="prose prose-orange prose-lg max-w-none">
            <ContentRenderer :value="result.page" />
          </article>
        </div>
      </div>

      <div v-else>
        <div class="mb-12 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h1 class="text-4xl font-black text-gray-900 mb-4">
            {{ result.page?.title || 'Product Series' }}
          </h1>
          <p class="text-gray-500 text-lg mb-6">{{ result.page?.description }}</p>
          <article v-if="result.page" class="prose prose-orange max-w-none border-t pt-6 mt-6">
            <ContentRenderer :value="result.page" />
          </article>
        </div>
        
        <div v-if="result.subProducts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
          >
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden">
              <img :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="p-8">
              <h4 class="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{{ item.title }}</h4>
              <p class="text-gray-500 mt-3 line-clamp-2">{{ item.description }}</p>
              <div class="mt-6 flex items-center text-orange-600 font-bold">
                View Details <span class="ml-2">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
:deep(table) { width: 100%; border-collapse: separate; border-spacing: 0; margin: 2rem 0; border-radius: 1rem; overflow: hidden; border: 1px solid #e5e7eb; }
:deep(th) { background-color: #1f2937; color: #ffffff; padding: 1rem; text-align: left; border-bottom: 2px solid #ea580c; }
:deep(td) { padding: 1rem; border-bottom: 1px solid #f3f4f6; }
:deep(tr:nth-child(even)) { background-color: #f9fafb; }
:deep(.aspect-video iframe) { width: 100% !important; height: auto; aspect-ratio: 16/9; border-radius: 1rem; }
</style>