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

// 图片加载失败的保底处理
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.style.display = 'none' // 隐藏破碎的图片
}

watch(() => route.path, () => refresh())
</script>

<template>
  <div class="bg-white min-h-screen pt-[60px]"> <div v-if="result">
      
      <section class="relative h-[45vh] min-h-[350px] w-full bg-[#001151] overflow-hidden flex items-end">
        <div class="absolute inset-0 bg-gradient-to-br from-[#001151] via-[#0b2b8a] to-green-900 opacity-90"></div>
        
        <img 
          v-if="result.page?.image"
          :src="result.page.image" 
          class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 transition-opacity duration-1000"
          @error="handleImageError"
        />

        <div class="relative max-w-7xl mx-auto w-full px-6 pb-12">
          <nav class="flex mb-4 text-xs font-bold uppercase tracking-widest text-green-400">
            <NuxtLink to="/" class="hover:text-white transition">Home</NuxtLink>
            <span class="mx-2 text-white/30">/</span>
            <NuxtLink to="/products" class="hover:text-white transition">Products</NuxtLink>
          </nav>
          <h1 class="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
            {{ result.page?.title }}
          </h1>
          <p class="text-lg md:text-xl text-white/80 max-w-3xl font-medium leading-relaxed">
            {{ result.page?.description }}
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-6 py-16">
        <div v-if="result.subProducts.length === 0 && result.page">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div class="lg:col-span-2">
              <article class="prose prose-orange prose-xl max-w-none">
                <ContentRenderer :value="result.page" />
              </article>
            </div>
            <div class="lg:col-span-1">
              <div class="sticky top-28 bg-gray-50 p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <div class="w-12 h-1 bg-orange-600 mb-6"></div>
                <h3 class="text-2xl font-black mb-2 text-gray-900">Factory Quote</h3>
                <p class="text-gray-500 mb-8 text-sm">Professional integration for agricultural machinery with 16 years experience.</p>
                <a :href="contactMailto" class="w-full flex items-center justify-center bg-orange-600 text-white text-lg font-bold py-5 rounded-2xl hover:bg-black transition-all duration-300">
                  Contact Zoe for Price
                </a>
                <ul class="mt-8 space-y-3 text-sm text-gray-400 font-medium">
                  <li class="flex items-center">✅ Global Shipping Support</li>
                  <li class="flex items-center">✅ LCL Container Consolidation</li>
                  <li class="flex items-center">✅ Genuine Spare Parts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <article v-if="result.page" class="prose prose-orange prose-lg max-w-none mb-20">
            <ContentRenderer :value="result.page" />
          </article>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <NuxtLink 
              v-for="item in result.subProducts" 
              :key="item.path"
              :to="item.path"
              class="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div class="aspect-[4/3] overflow-hidden bg-gray-50">
                <img :src="item.image" class="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div class="p-8">
                <h4 class="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{{ item.title }}</h4>
                <p class="text-gray-500 mt-3 line-clamp-2">{{ item.description }}</p>
                <div class="mt-8 flex items-center text-orange-600 font-bold uppercase tracking-wider text-sm">
                  View Details <span class="ml-2 group-hover:ml-4 transition-all">→</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>