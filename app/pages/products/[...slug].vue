<script setup lang="ts">
const route = useRoute()

// 1. 获取当前页面的原始路径
const currentPath = computed(() => route.path.replace(/\/$/, ''))

const { data: result, refresh } = await useAsyncData(`content-${currentPath.value}`, async () => {
  // 查找当前页面内容
  const page = await queryCollection('products').path(currentPath.value).first()
  
  // 查找子分类或产品
  const subContent = await queryCollection('products')
    .where('path', 'LIKE', `${currentPath.value}/%`)
    .all()

  // 过滤出直接子项
  const filteredSubs = subContent.filter(item => {
    const relative = item.path.replace(currentPath.value + '/', '')
    return !relative.includes('/') || (relative.split('/').length === 2 && relative.endsWith('/index'))
  })

  return { page, subProducts: filteredSubs }
})

// 2. 邮件联系逻辑（崔总：邮件正文会自动带上产品型号）
const contactMailto = computed(() => {
  const title = result.value?.page?.title || 'Machinery'
  const subject = encodeURIComponent(`Inquiry for HECOTH: ${title}`)
  const body = encodeURIComponent(`Dear Zoe,\n\nI am interested in the ${title}.\n\nPlease send me the technical specifications and price list.\n\nMy WhatsApp/Phone: \nCompany: `)
  return `mailto:zoe@annetop.com?subject=${subject}&body=${body}`
})

watch(() => route.path, () => refresh())
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div v-if="result?.page" class="max-w-7xl mx-auto px-4 py-10">
      
      <nav class="flex mb-8 text-sm font-medium text-gray-400">
        <NuxtLink to="/" class="hover:text-orange-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-gray-900">{{ result.page.title }}</span>
      </nav>

      <div v-if="!currentPath.endsWith('index') && !currentPath.endsWith('/products')" 
           class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
        
        <div class="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 overflow-hidden">
          <img 
            v-if="result.page.image"
            :src="result.page.image" 
            class="w-full h-auto rounded-2xl object-contain bg-gray-50"
            :alt="result.page.title"
          />
          <div v-else class="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
            No Image Found
          </div>
        </div>

        <div class="flex flex-col pt-4">
          <div class="inline-flex items-center space-x-2 text-orange-600 font-bold mb-4">
            <span class="w-8 h-px bg-orange-600"></span>
            <span class="uppercase tracking-widest text-sm">Agriculture Solution</span>
          </div>
          <h1 class="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {{ result.page.title }}
          </h1>
          <p class="text-xl text-gray-500 mb-8 leading-relaxed">
            {{ result.page.description }}
          </p>
          
          <div class="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-orange-600">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Request Professional Quote</h3>
            <p class="text-gray-500 mb-6 italic">16 Years Industry Experience | Global Export Support</p>
            <a :href="contactMailto" 
               class="flex items-center justify-center bg-orange-600 text-white text-xl font-bold py-5 rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
              Check Specs & Pricing
            </a>
            <p class="mt-4 text-center text-xs text-gray-400">
              Response within 12 hours · LCL Consolidation Available
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
        <article class="prose prose-orange prose-lg max-w-none">
          <ContentRenderer :value="result.page" />
        </article>
      </div>

      <div v-if="result.subProducts?.length" class="mt-16">
        <div class="flex items-center mb-10">
          <h2 class="text-3xl font-bold text-gray-900 mr-6">Related Models</h2>
          <div class="flex-grow h-px bg-gray-200"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500"
          >
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden">
              <img :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="p-6">
              <h4 class="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {{ item.title }}
              </h4>
              <p class="text-gray-500 text-sm mt-2 line-clamp-1">{{ item.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 崔总专用：深色专业工业风格表格 */
:deep(table) {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 2rem 0;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
:deep(th) {
  background-color: #1f2937; /* 深色背景，更专业 */
  color: #ffffff;
  padding: 1rem 1.2rem;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ea580c;
}
:deep(td) {
  padding: 1rem 1.2rem;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
}
:deep(tr:last-child td) {
  border-bottom: none;
}
:deep(tr:nth-child(even)) {
  background-color: #f9fafb;
}

/* 视频响应式比例 */
:deep(.aspect-video iframe) {
  width: 100% !important;
  height: 100% !important;
  aspect-ratio: 16 / 9;
  border-radius: 1.5rem;
}

/* 引用块美化 */
:deep(blockquote) {
  border-left: 6px solid #ea580c;
  background: #fff7ed;
  padding: 1.5rem;
  border-radius: 0 1rem 1rem 0;
  margin: 2rem 0;
}
</style>