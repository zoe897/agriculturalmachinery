<script setup lang="ts">
/**
 * 核心逻辑：
 * 1. 支持无限层级嵌套 (products/a/b/c/d.md)
 * 2. 自动区分“目录页”与“详情页”
 * 3. SEO 深度集成
 * 4. 移动端表格滚动修复
 */

const route = useRoute()

// 1. 处理路径：移除末尾斜杠，处理基础路径
const cleanPath = computed(() => {
  const path = route.path.replace(/\/$/, '')
  return path === '' ? '/' : path
})

// 2. 增强型数据异步抓取
const { data: result, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // 同时尝试获取当前页面内容
  let page = await queryCollection('products').path(cleanPath.value).first()
  
  // 如果当前路径没有直接对应的 md，尝试寻找该目录下的 index.md
  if (!page) {
    page = await queryCollection('products').path(`${cleanPath.value}/index`).first()
  }

  // 获取该路径下的所有直接子项（用于展示分类列表）
  const allChildren = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  // 深度过滤逻辑：只展示当前路径的“直接下一层”内容
  const currentDepth = cleanPath.value.split('/').filter(Boolean).length
  const subItems = allChildren.filter(item => {
    // 排除自己和自身的 index
    if (item.path === cleanPath.value || item.path.endsWith('/index')) return false
    
    // 路径深度检查：item 深度必须等于当前深度 + 1
    const itemDepth = item.path.split('/').filter(Boolean).length
    return itemDepth === currentDepth + 1
  })

  return { page, subItems }
}, { watch: [() => route.path] })

// 3. 注入 SEO Meta - 提升 Google 排名
useSeoMeta({
  title: () => `${result.value?.page?.title || 'Agricultural Machinery'} - Jinan Hecoth`,
  description: () => result.value?.page?.description || '16 Years expert sourcing service for heavy duty agricultural machinery.',
  ogTitle: () => result.value?.page?.title,
  ogDescription: () => result.value?.page?.description,
  ogImage: () => result.value?.page?.image,
  twitterCard: 'summary_large_image',
})

// 4. 动态询盘邮件链接
const contactMailto = computed(() => {
  const title = result.value?.page?.title || 'Machinery'
  return `mailto:zoe@annetop.com?subject=Inquiry for ${encodeURIComponent(title)}&body=Dear Zoe, I am interested in ${encodeURIComponent(title)} from your website. Please provide the latest price and technical catalog.`
})

// 5. 监听路由变化刷新数据
watch(() => route.path, () => refresh())
</script>

<template>
  <div class="bg-white min-h-screen">
    <div v-if="result">
      <section class="relative h-[40vh] md:h-[45vh] w-full bg-[#001151] overflow-hidden flex items-end">
        <div class="absolute inset-0 bg-[#001151]"></div>
        
        <NuxtImg 
          v-if="result.page?.image"
          :src="result.page.image" 
          class="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Agricultural Machinery Banner"
          loading="eager"
          format="webp"
        />
        
        <div class="absolute inset-0 bg-gradient-to-t from-[#001151] via-transparent to-transparent"></div>
        
        <div class="relative max-w-7xl mx-auto w-full px-6 pb-12">
          <nav class="flex mb-4 text-sm text-white/50 space-x-2">
            <NuxtLink to="/" class="hover:text-white transition">Home</NuxtLink>
            <template v-for="(slug, index) in route.params.slug" :key="index">
              <span>/</span>
              <NuxtLink 
                :to="'/products/' + (route.params.slug as string[]).slice(0, index + 1).join('/')"
                class="hover:text-white capitalize transition"
              >
                {{ slug }}
              </NuxtLink>
            </template>
          </nav>

          <h1 class="text-3xl md:text-5xl font-black text-white mb-2 uppercase tracking-tight">
            {{ result.page?.title }}
          </h1>
          <p class="text-white/80 max-w-2xl text-base md:text-lg font-medium">
            {{ result.page?.description }}
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-6 py-12">
        <div v-if="result.subItems.length === 0" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <article class="prose-product">
              <div class="responsive-content">
                <ContentRenderer v-if="result.page" :value="result.page" />
              </div>
            </article>
          </div>
          
          <div class="lg:col-span-1">
            <div class="sticky top-24 p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm">
              <h3 class="text-xl font-bold mb-4 text-[#001151]">Instant Inquiry</h3>
              <p class="text-gray-600 mb-6 text-sm">Get a professional quote and technical support from our engineering team.</p>
              
              <a :href="contactMailto" class="flex items-center justify-center w-full bg-[#ea580c] text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-lg">
                Email Zoe for Quote
              </a>
              
              <div class="mt-8 pt-6 border-t border-gray-200 space-y-4">
                <div class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">✓</span>
                  <div>
                    <p class="text-sm font-bold text-gray-800">16-Year Expert</p>
                    <p class="text-xs text-gray-500">Deep technical knowledge in machinery.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="text-green-500 font-bold">✓</span>
                  <div>
                    <p class="text-sm font-bold text-gray-800">Strict QC</p>
                    <p class="text-xs text-gray-500">Every spare part is inspected.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subItems" 
            :key="item.path" 
            :to="item.path" 
            class="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all flex flex-col"
          >
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden relative p-4">
              <NuxtImg 
                v-if="item.image" 
                :src="item.image" 
                class="w-full h-full object-contain group-hover:scale-105 transition duration-500" 
                alt="Category Thumbnail"
                loading="lazy"
                format="webp"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-300 italic">No Image Available</div>
            </div>
            <div class="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h4 class="font-bold text-xl group-hover:text-[#ea580c] transition-colors line-clamp-1">{{ item.title }}</h4>
                <p class="text-gray-500 text-sm mt-2 line-clamp-2">{{ item.description }}</p>
              </div>
              <div class="mt-4 text-[#ea580c] font-bold text-sm flex items-center">
                Explore Now <span class="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 响应式内容容器：解决移动端表格溢出的核心 */
.responsive-content {
  width: 100%;
  overflow-x: hidden;
}

.responsive-content :deep(table) {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-collapse: collapse;
  margin: 2rem 0;
}

/* 保持 Markdown 生成样式的专业美化 */
.prose-product :deep(h2) {
  font-size: 1.75rem;
  font-weight: 800;
  margin-top: 3rem;
  padding-left: 1rem;
  border-left: 4px solid #ea580c;
  color: #001151;
}

.prose-product :deep(p) {
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 1.25rem;
}

.prose-product :deep(img) {
  border-radius: 1rem;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
  margin: 2.5rem 0;
}
</style>