<script setup lang="ts">
const route = useRoute()

// 1. 仅在查询数据库时使用小写匹配路径
const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

// 2. 异步获取数据
const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  // 获取当前页面（可能是分类页的 index.md，也可能是具体产品 md）
  const page = await queryCollection('products').path(cleanPath.value).first()
  
  // 核心逻辑修改：只查找直接下一层的内容，不穿透子目录
  // 例如在 /products/implement 时，只找 /products/implement/tillage，不找 tillage 里的具体产品
  const allSubContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  // 过滤出直接子级：路径只比当前路径多出一层的
  const currentLevelDepth = cleanPath.value.split('/').filter(Boolean).length
  const subProducts = allSubContent.filter(item => {
    const itemDepth = item.path.split('/').filter(Boolean).length
    // 规则：
    // 1. 深度必须是当前层级 + 1
    // 2. 排除掉 index.md 自身（避免自己指向自己）
    return itemDepth === currentLevelDepth + 1 && !item.path.endsWith('index')
  })

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
          <h1 class="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">
            {{ result.page?.title || 'Machinery Range' }}
          </h1>
          <div class="w-24 h-2 bg-orange-600 mx-auto mb-6"></div>
          <p class="text-xl text-gray-500 max-w-3xl mx-auto">
            {{ result.page?.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
          >
            <div class="aspect-[4/3] bg-gray-50 overflow-hidden relative">
              <img 
                v-if="item.image"
                :src="item.image" 
                :alt="item.title"
                class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
              />
              <div v-if="item.path.split('/').length < 5" class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md">
                Category
              </div>
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-gray-500 line-clamp-2 mb-6 text-sm leading-relaxed">{{ item.description }}</p>
              <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-orange-600 font-bold">
                <span>Explore Range</span>
                <span class="transform group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="result?.page" class="max-w-6xl mx-auto">
        <nav class="flex flex-wrap gap-2 text-sm text-gray-400 mb-10 items-center font-medium bg-gray-50 p-4 rounded-2xl">
          <NuxtLink to="/products" class="hover:text-orange-600 transition-colors">Products</NuxtLink>
          <span v-for="(part, index) in route.path.split('/').filter(p => p && p !== 'products')" :key="index" class="flex items-center gap-2">
            <span>/</span>
            <span :class="index === route.path.split('/').filter(Boolean).length - 2 ? 'text-gray-900 font-bold' : 'capitalize'">
              {{ part.replace(/-/g, ' ') }}
            </span>
          </span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div class="rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 aspect-square flex items-center justify-center sticky top-8">
            <img 
              v-if="result.page.image"
              :src="result.page.image" 
              :alt="result.page.title"
              class="w-full h-full object-contain p-8" 
            />
          </div>

          <div class="flex flex-col justify-center">
            <h1 class="text-5xl font-black text-gray-900 mb-8 leading-tight">{{ result.page.title }}</h1>
            <div class="space-y-6 mb-10">
               <p class="text-2xl text-gray-600 border-l-8 border-orange-500 pl-6 leading-relaxed">
                {{ result.page.description }}
              </p>
            </div>
            <div class="flex flex-col gap-4">
              <a href="mailto:zoe@annetop.com" class="inline-block text-center bg-orange-600 hover:bg-black text-white text-2xl font-black py-6 px-12 rounded-2xl shadow-xl transition-all transform hover:-translate-y-2 active:scale-95">
                GET PRICE NOW
              </a>
              <div class="flex justify-center gap-8 text-sm text-gray-400 font-bold uppercase tracking-widest">
                <span>Fast Delivery</span>
                <span>•</span>
                <span>OEM Support</span>
                <span>•</span>
                <span>16 Years Exp</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t-4 border-gray-900 pt-16">
          <h2 class="text-3xl font-black text-gray-900 mb-10 uppercase tracking-tighter">Technical Specifications</h2>
          <article class="prose prose-orange lg:prose-xl max-w-none">
            <ContentRenderer :value="result.page" />
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.prose :deep(table) { width: 100%; border-collapse: collapse; margin: 2.5rem 0; font-size: 1em; border: 2px solid #000; }
.prose :deep(th) { background-color: #000; color: #fff; padding: 18px; border: 1px solid #333; text-align: left; text-transform: uppercase; letter-spacing: 1px; }
.prose :deep(td) { padding: 18px; border: 1px solid #e5e7eb; font-weight: 500; }
.prose :deep(tr:nth-child(even)) { background-color: #f9fafb; }
.prose :deep(img) { border-radius: 2rem; margin: 3rem auto; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2); }
.prose :deep(h2) { font-size: 2.25rem; font-weight: 900; color: #111827; margin-top: 4rem; border-bottom: 4px solid #f97316; display: inline-block; }
</style>