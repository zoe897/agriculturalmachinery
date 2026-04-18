<template>
  <section class="services py-20 bg-white">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="text-blue-500 text-xl font-medium mb-4">{{ siteConfig.service.welcomeText || 'Welcome My Business' }}</p>
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {{ siteConfig.service.mainHeading || 'Solutions tailored to your needs' }}
        </h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          {{ siteConfig.service.subtitle || 'We exist to help your financial journey from start to finish.' }}
        </p>
      </div>

      <!-- Services Cards Container -->
      <div class="relative overflow-hidden">
        <div 
          class="flex transition-transform duration-500 ease-in-out gap-6"
          :style="trackStyle"
        >
          <!-- 🌟 遍历从 JSON 转换后的 displayServices -->
          <div 
            v-for="(service, index) in displayServices" 
            :key="index"
            class="service-card flex-shrink-0"
            :style="cardWidthStyle"
          >
            <div class="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <div class="text-blue-500">
                  <component :is="service.iconComponent" class="w-12 h-12" stroke-width="1.5" />
                </div>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ service.title }}</h3>
              <p class="text-gray-600 mb-6 flex-grow">{{ service.description }}</p>
              <NuxtLink to="/contact" class="text-center w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition-colors duration-300">
                Learn more
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <div class="flex justify-center space-x-4 mt-10">
          <button 
            @click="scrollLeft"
            class="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div class="flex items-center space-x-2">
            <span 
              v-for="i in maxSlides" 
              :key="i"
              class="h-1 rounded-full transition-colors cursor-pointer"
              :class="currentSlide === i - 1 ? 'w-8 bg-blue-500' : 'w-4 bg-gray-300'"
              @click="goToSlide(i - 1)"
            ></span>
          </div>

          <button 
            @click="scrollRight"
            class="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Globe, Bitcoin, CircleDollarSign } from 'lucide-vue-next'

// 🌟 图标映射表：将 JSON 中的字符串映射为实际组件
const iconMap: Record<string, any> = {
  Globe,
  Bitcoin,
  CircleDollarSign
}

// 🌟 初始化配置对象
const siteConfig = ref({
  service: {
    welcomeText: '',
    mainHeading: '',
    subtitle: '',
    list: [] as any[]
  }
})

// 🌟 计算属性：将 JSON 中的原始 list 转换为包含组件对象的列表
const displayServices = computed(() => {
  if (!siteConfig.value.service.list) return []
  return siteConfig.value.service.list.map(item => ({
    ...item,
    iconComponent: iconMap[item.icon] || Globe // 匹配不到则默认显示 Globe
  }))
})

const itemsToShow = ref(3)
const currentSlide = ref(0)
const gap = 24 

const updateItemsToShow = () => {
  if (typeof window !== 'undefined') {
    itemsToShow.value = window.innerWidth < 768 ? 1.5 : 3
  }
}

onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsToShow);
})

const cardWidthStyle = computed(() => {
  const gapTotal = (Math.ceil(itemsToShow.value) - 1) * gap
  return {
    width: `calc((100% - ${gapTotal}px) / ${itemsToShow.value})`
  }
})

const trackStyle = computed(() => {
  const cardWidthCalc = `(100% - ${(Math.ceil(itemsToShow.value) - 1) * gap}px) / ${itemsToShow.value}`
  return {
    transform: `translateX(calc(-${currentSlide.value} * (${cardWidthCalc} + ${gap}px)))`
  }
})

// 分页圆点数量：基于 displayServices 的长度计算
const maxSlides = computed(() => {
  const count = displayServices.value.length - Math.floor(itemsToShow.value) + (itemsToShow.value === 1.5 ? 0 : 1)
  return Math.max(0, count)
})

const scrollLeft = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const scrollRight = () => {
  const maxIndex = displayServices.value.length - Math.floor(itemsToShow.value)
  if (currentSlide.value < maxIndex) {
    currentSlide.value++
  }
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// 🌟 核心修改：从 setting.json 异步加载数据
onMounted(async () => {
    try {
        const response = await fetch('/setting.json')
        if (response.ok) {
            const data = await response.json()
            // 合并数据
            siteConfig.value = { ...siteConfig.value, ...data }
        }
    } catch (e) {
        console.warn("Setting.json not found or invalid format")
    }
})
</script>

<style scoped>
.service-card {
  transition: transform 0.3s ease;
}
.service-card:hover {
  transform: translateY(-5px);
}
</style>