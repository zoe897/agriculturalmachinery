<script setup lang="ts">
const route = useRoute()
// 移除末尾斜杠，确保路径匹配一致性
const cleanPath = computed(() => route.path.replace(/\/$/, ''))

const { data: result, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // 1. 获取当前页面内容
  let page = await queryCollection('products').path(cleanPath.value).first()
  
  // 2. 如果是目录，尝试获取 index
  if (!page) {
    page = await queryCollection('products').path(`${cleanPath.value}/index`).first()
  }

  // 3. 获取同级或子级产品（用于分类页展示）
  const allContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  // 过滤掉 index 本身，只留下具体产品卡片
  const subProducts = allContent.filter(item => !item.path.endsWith('/index'))
  
  return { page, subProducts }
}, { watch: [() => route.path] })

// 动态邮件链接
const contactMailto = computed(() => {
  const title = result.value?.page?.title || 'Machinery'
  return `mailto:zoe@annetop.com?subject=Inquiry for ${encodeURIComponent(title)}&body=Dear Zoe, I am interested in ${encodeURIComponent(title)}...`
})

watch(() => route.path, () => refresh())
</script>

<template>
  <div class="bg-white min-h-screen">
    <div v-if="result">
      <section class="relative h-[45vh] w-full bg-[#001151] overflow-hidden flex items-end">
        <div class="absolute inset-0 bg-[#001151]"></div>
        
        <img 
          v-if="result.page?.image"
          :src="result.page.image" 
          class="absolute inset-0 w-full h-full object-cover opacity-80"
          alt="Product Banner"
        />
        
        <div class="absolute inset-0 bg-gradient-to-t from-[#001151] via-transparent to-transparent"></div>
        
        <div class="relative max-w-7xl mx-auto w-full px-6 pb-10">
          <h1 class="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
            {{ result.page?.title }}
          </h1>
          <p class="text-white/80 max-w-2xl text-lg font-medium">
            {{ result.page?.description }}
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-6 py-12">
        <div v-if="result.subProducts.length === 0" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <article class="prose-product">
              <ContentRenderer :value="result.page" />
            </article>
          </div>
          
          <div class="lg:col-span-1">
            <div class="sticky top-24 p-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm text-center">
              <h3 class="text-xl font-bold mb-4">Request a Quote</h3>
              <p class="text-gray-600 mb-6 text-sm">Professional supply chain integration for agricultural & construction machinery.</p>
              <a :href="contactMailto" class="block w-full bg-[#ea580c] text-white font-black py-4 rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-orange-200">
                Contact Zoe for Price
              </a>
              <div class="mt-8 pt-6 border-t border-gray-200 text-left space-y-3">
                <p class="text-sm font-bold flex items-center gap-2"><span class="text-green-500">✓</span> 16 Years Industry Experience</p>
                <p class="text-sm font-bold flex items-center gap-2"><span class="text-green-500">✓</span> LCL Container Consolidation</p>
                <p class="text-sm font-bold flex items-center gap-2"><span class="text-green-500">✓</span> Global Door-to-Door Logistics</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink v-for="item in result.subProducts" :key="item.path" :to="item.path" class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden relative">
              <img 
                v-if="item.image" 
                :src="item.image" 
                class="w-full h-full object-contain p-6 group-hover:scale-110 transition duration-500" 
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
            </div>
            <div class="p-6">
              <h4 class="font-bold text-xl group-hover:text-orange-600 transition-colors">{{ item.title }}</h4>
              <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ item.description }}</p>
              <div class="mt-4 text-[#ea580c] font-bold text-sm inline-flex items-center">
                View Details <span class="ml-1">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<pre class="text-xs text-red-500">{{ result.page?.image }}</pre>
<style scoped>
/* --- 深度渲染美化 (强制作用于 Markdown 生成的 HTML) --- */

/* 1. 标题样式 */
.prose-product :deep(h2) {
  font-size: 1.875rem;
  font-weight: 800;
  margin-top: 3rem;
  margin-bottom: 1.25rem;
  color: #111827;
  border-left: 6px solid #ea580c;
  padding-left: 1.25rem;
  letter-spacing: -0.025em;
}

/* 2. 文本样式 */
.prose-product :deep(p) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 1.5rem;
}

/* 3. 导语样式 (.lead-text) */
.prose-product :deep(.lead-text) {
  font-size: 1.25rem;
  color: #4b5563;
  font-style: italic;
  margin: 2rem 0 3rem 0;
  border-left: 4px solid #10b981;
  padding-left: 1.5rem;
  background-color: #f0fdf4;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

/* 4. 核心优势卡片 (.feature-grid) */
.prose-product :deep(.feature-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.prose-product :deep(.feature-card) {
  padding: 2rem;
  border: 1px solid #f3f4f6;
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.prose-product :deep(.feature-card:hover) {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #ea580c;
}

.prose-product :deep(.feature-card h3) {
  font-size: 1.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.75rem;
  margin-top: 0;
  border-left: none;
  padding-left: 0;
}

/* 5. 机械参数表格强制美化 */
.prose-product :deep(table) {
  width: 100% !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  margin: 2.5rem 0 !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
}

.prose-product :deep(th) {
  background-color: #1f2937 !important;
  color: white !important;
  padding: 1.25rem !important;
  text-align: left !important;
  text-transform: uppercase;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
}

.prose-product :deep(td) {
  padding: 1rem 1.25rem !important;
  border-bottom: 1px solid #f3f4f6 !important;
  background-color: white !important;
  font-size: 0.95rem;
}

.prose-product :deep(tr:last-child td) {
  border-bottom: none !important;
}

/* 6. 正文图片美化 */
.prose-product :deep(img) {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 1.5rem !important;
  margin: 3rem 0 !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
}

/* 7. 视频容器 (16:9) */
.prose-product :deep(.video-container) {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  margin: 3rem 0;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.prose-product :deep(.video-container iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>