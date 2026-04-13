<script setup lang="ts">
const route = useRoute()
const cleanPath = computed(() => route.path.replace(/\/$/, ''))

const { data: result, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  let page = await queryCollection('products').path(cleanPath.value).first()
  if (!page) {
    page = await queryCollection('products').path(`${cleanPath.value}/index`).first()
  }
  const allContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  const subProducts = allContent.filter(item => {
    return !item.path.endsWith('/index')
  })

  return { page, subProducts }
}, { watch: [() => route.path] })

const contactMailto = computed(() => {
  const title = result.value?.page?.title || 'Machinery'
  return `mailto:zoe@annetop.com?subject=Inquiry for ${encodeURIComponent(title)}&body=Dear Zoe, I am interested in ${encodeURIComponent(title)}...`
})

watch(() => route.path, () => refresh())
</script>

<template>
  <div class="bg-white min-h-screen">
    <div v-if="result">
      <div class="relative h-[50vh] min-h-[400px] w-full bg-gray-900 overflow-hidden">
        <img 
          :src="result.page?.image || '/img/placeholder.jpg'" 
          class="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div class="relative max-w-7xl mx-auto h-full px-4 flex flex-col justify-end pb-16">
          <nav class="flex mb-4 text-sm font-medium text-gray-300">
            <NuxtLink to="/" class="hover:text-orange-500">Home</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/products" class="hover:text-orange-500">Products</NuxtLink>
          </nav>
          <h1 class="text-4xl md:text-6xl font-black text-white mb-4">
            {{ result.page?.title || 'Our Series' }}
          </h1>
          <p class="text-xl text-gray-200 max-w-2xl line-clamp-2">
            {{ result.page?.description }}
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-12">
        <div v-if="result.subProducts.length === 0 && result.page">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div class="lg:col-span-2">
              <div class="prose prose-orange prose-xl max-w-none">
                <ContentRenderer :value="result.page" />
              </div>
            </div>
            
            <div class="lg:col-span-1">
              <div class="sticky top-24 bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 class="text-2xl font-bold mb-4 text-gray-900">Direct Inquiry</h3>
                <p class="text-gray-600 mb-6">Professional agricultural machinery supplier since 2010.</p>
                <a :href="contactMailto" class="flex items-center justify-center bg-orange-600 text-white text-lg font-bold py-4 rounded-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100">
                  Get Current Price
                </a>
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <p class="text-sm text-gray-400">Response within 24 hours</p>
                  <p class="text-sm text-gray-400">Email: zoe@annetop.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <article v-if="result.page" class="prose prose-orange prose-lg max-w-none mb-16 pb-12 border-b">
            <ContentRenderer :value="result.page" />
          </article>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <NuxtLink 
              v-for="item in result.subProducts" 
              :key="item.path"
              :to="item.path"
              class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div class="aspect-[4/3] overflow-hidden bg-gray-100">
                <img :src="item.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div class="p-8">
                <h4 class="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{{ item.title }}</h4>
                <p class="text-gray-500 mt-3 line-clamp-2 text-sm">{{ item.description }}</p>
                <div class="mt-6 flex items-center text-orange-600 font-bold text-sm uppercase tracking-wider">
                  Learn More <span class="ml-2 group-hover:ml-4 transition-all">→</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 深度美化 Markdown 渲染出来的表格 */
:deep(table) { 
  width: 100%; 
  border-collapse: separate; 
  border-spacing: 0; 
  margin: 2.5rem 0; 
  border-radius: 1.25rem; 
  overflow: hidden; 
  border: 1px solid #f3f4f6;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
}
:deep(th) { 
  background-color: #f9fafb; 
  color: #111827; 
  padding: 1.25rem 1rem; 
  text-align: left; 
  font-weight: 800;
  border-bottom: 2px solid #ea580c; 
}
:deep(td) { 
  padding: 1.25rem 1rem; 
  border-bottom: 1px solid #f3f4f6; 
  background: white;
}
:deep(tr:last-child td) { border-bottom: none; }
:deep(tr:hover td) { background-color: #fffaf8; }

/* 响应式视频 */
:deep(.video-container) {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  margin: 3rem 0;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}
:deep(.video-container iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

/* 核心优势卡片样式 (配合你 MD 里的 HTML) */
:deep(.feature-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
}
:deep(.feature-card) {
  background: #f9fafb;
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}
:deep(.feature-card:hover) {
  background: white;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  transform: translateY(-5px);
}
</style>