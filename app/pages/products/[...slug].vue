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

  const subProducts = allContent.filter(item => !item.path.endsWith('/index'))
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
      <section class="relative h-[40vh] w-full bg-[#001151] overflow-hidden flex items-end">
        <div class="absolute inset-0 bg-gradient-to-br from-[#001151] to-green-900 opacity-90"></div>
        <img 
          v-if="result.page?.image"
          :src="result.page.image" 
          class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
        <div class="relative max-w-7xl mx-auto w-full px-6 pb-10">
          <h1 class="text-4xl md:text-5xl font-black text-white mb-2">{{ result.page?.title }}</h1>
          <p class="text-white/70 max-w-2xl">{{ result.page?.description }}</p>
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
            <div class="sticky top-24 p-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
              <h3 class="text-xl font-bold mb-4">Inquiry Details</h3>
              <a :href="contactMailto" class="block w-full text-center bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-black transition">
                Contact Zoe for Price
              </a>
              <div class="mt-6 text-sm text-gray-400 space-y-2">
                <p>✓ 16 Years Experience</p>
                <p>✓ LCL Container Support</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink v-for="item in result.subProducts" :key="item.path" :to="item.path" class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition">
            <div class="aspect-square bg-gray-50 p-4">
              <img :src="item.image" class="w-full h-full object-contain group-hover:scale-105 transition duration-500" />
            </div>
            <div class="p-6">
              <h4 class="font-bold text-xl group-hover:text-orange-600">{{ item.title }}</h4>
              <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ item.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. 基础文字排版修复 */
.prose-product :deep(h2) {
  font-size: 1.8rem;
  font-weight: 800;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #111827;
  border-left: 5px solid #ea580c; /* 橙色左边框 */
  padding-left: 1rem;
}

.prose-product :deep(p) {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 1.5rem;
}

/* 2. 导语样式 (对应 Markdown 里的 lead-text 类) */
.prose-product :deep(.lead-text) {
  font-size: 1.25rem;
  color: #6b7280;
  font-style: italic;
  margin-bottom: 2.5rem;
  border-left: 4px solid #10b981; /* 绿色左边框 */
  padding-left: 1.5rem;
  line-height: 1.8;
}

/* 3. 核心优势卡片布局 (feature-grid & feature-card) */
.prose-product :deep(.feature-grid) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.prose-product :deep(.feature-card) {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  background: linear-gradient(145deg, #ffffff, #f9fafb);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.prose-product :deep(.feature-card:hover) {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.prose-product :deep(.feature-card h3) {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  margin-top: 0;
  border-left: none; /* 移除卡片内标题的边框 */
  padding-left: 0;
}

/* 4. 强制表格样式 (确保机械参数清晰) */
.prose-product :deep(table) {
  width: 100% !important;
  border-collapse: collapse !important;
  margin: 2rem 0 !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 0.75rem !important;
  overflow: hidden !important;
}

.prose-product :deep(th) {
  background-color: #1f2937 !important; /* 深灰色表头 */
  color: white !important;
  padding: 1rem !important;
  text-align: left !important;
  font-weight: 700 !important;
}

.prose-product :deep(td) {
  padding: 1rem !important;
  border: 1px solid #e5e7eb !important;
  background-color: white !important;
}

/* 5. 图片美化 */
.prose-product :deep(img) {
  max-width: 100% !important;
  height: auto !important;
  border-radius: 1rem !important;
  margin: 2rem 0 !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}

/* 6. 视频容器 (保持 16:9 比例) */
.prose-product :deep(.video-container) {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 比例 */
  margin: 2.5rem 0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.prose-product :deep(.video-container iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>