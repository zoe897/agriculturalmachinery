<template>
  <section class="partners py-16 bg-[#f8fafc]">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <p class="text-gray-800 text-xl font-medium">We are trusted by leading global companies</p>
      </div>

      <!-- Partners Logos -->
      <div class="partners-logos flex flex-wrap justify-center items-center gap-12">
        <!-- 修复1 & 2：去掉 .value，直接遍历 siteConfig.partners -->
        <div 
          v-for="(partner, index) in siteConfig.partners" 
          :key="index"
          class="partner-logo flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        >
          <!-- 修复4：将 h-30 改为 h-28 或 h-32 -->
          <img 
            v-if="partner.logo"
            :src="partner.logo"
            :alt="partner.name"
            class="h-28" 
          />
          <span v-else class="text-gray-500 font-medium">{{ partner.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// 修复5：补充必要的引入
import { ref, onMounted } from 'vue'

// 补充 TS 类型定义
interface Partner {
  name: string
  logo?: string
}

interface SiteConfig {
  partners: Partner[]
  [key: string]: any // 允许合并 setting.json 里的其他配置
}

const siteConfig = ref<SiteConfig>({
  partners: []
})

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
.partners {
  position: relative;
}

.partner-logo {
  transition: all 0.3s ease;
}

.partner-logo:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .partners-logos {
    gap: 1.5rem; /* 修复3：加上单位，比如 1.5rem (24px) 或者 8px */
  }
  
  .partner-logo img {
    max-height: 68px;
  }
}
</style>