<script setup lang="ts">
const route = useRoute()

const cleanPath = computed(() => {
  return route.path.replace(/\/$/, '').toLowerCase()
})

const { data: result, pending, refresh } = await useAsyncData(`content-${cleanPath.value}`, async () => {
  const page = await queryCollection('products')
    .path(cleanPath.value)
    .first()
  
  const allSubContent = await queryCollection('products')
    .where('path', 'LIKE', `${cleanPath.value}/%`)
    .all()

  const subProducts = allSubContent.filter(item => {
    const relativePath = item.path.toLowerCase().replace(cleanPath.value + '/', '')
    const parts = relativePath.split('/')
    const isDirectFile = parts.length === 1 && !relativePath.includes('index')
    const isDirectSubFolder = parts.length === 2 && parts[1] === 'index'
    return isDirectFile || isDirectSubFolder
  })

  return { page, subProducts }
}, { watch: [() => route.path] })

// 判断是否为具体产品页（非 index 结尾，非 products 根目录）
const isProductDetail = computed(() => {
  return !cleanPath.value.endsWith('index') && !cleanPath.value.endsWith('/products')
})

// 自动生成邮件链接，包含产品名称，方便客户留资
const contactMailto = computed(() => {
  const subject = encodeURIComponent(`Inquiry for: ${result.value?.page?.title || 'Machinery'}`)
  const body = encodeURIComponent(`Dear Zoe,\n\nI am interested in ${result.value?.page?.title}.\n\nPlease send me the technical specifications and price list.\n\nMy Contact Information:\nName:\nCompany:\nPhone/WhatsApp:`)
  return `mailto:zoe@annetop.com?subject=${subject}&body=${body}`
})

watch(() => route.path, () => refresh())
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600"></div>
    </div>

    <div v-else-if="result?.page">
      <nav class="flex mb-6 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-orange-600">Home</NuxtLink>
        <span class="mx-2">/</span>
        <NuxtLink to="/products" class="hover:text-orange-600">Products</NuxtLink>
      </nav>

      <div v-if="isProductDetail" class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        <div class="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
          <img 
            :src="result.page.image || '/img/tractor/P80.png'" 
            class="w-full h-auto object-contain"
            :alt="result.page.title"
          />
        </div>
        <div class="flex flex-col justify-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ result.page.title }}</h1>
          <p class="text-gray-600 mb-8">{{ result.page.description }}</p>
          
          <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 class="font-bold text-gray-900 mb-2">Get Full Specifications</h3>
            <p class="text-sm text-gray-500 mb-4">Leave your contact details via email for a quick quote.</p>
            <a :href="contactMailto" class="block w-full bg-orange-600 text-white text-center py-3 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-100">
              Send Inquiry Now
            </a>
          </div>
        </div>
      </div>

      <div v-else class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900">{{ result.page.title }}</h1>
        <p class="text-gray-600 mt-2">{{ result.page.description }}</p>
        <div class="h-1 w-20 bg-orange-600 mt-4"></div>
      </div>

      <article class="prose prose-orange max-w-none mb-16 p-6 bg-white rounded-xl border border-gray-100">
        <ContentRenderer :value="result.page" />
      </article>

      <div v-if="result.subProducts?.length">
        <h2 class="text-xl font-bold mb-6">Explore {{ result.page.title }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink 
            v-for="item in result.subProducts" 
            :key="item.path"
            :to="item.path"
            class="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition"
          >
            <div class="aspect-video bg-gray-50">
              <img :src="item.image || '/img/tractor/P80.png'" class="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div class="p-4">
              <h4 class="font-bold text-gray-900 group-hover:text-orange-600">{{ item.title }}</h4>
              <p class="text-sm text-gray-500 line-clamp-1 mt-1">{{ item.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>