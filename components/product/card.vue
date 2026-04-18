<template>
  <!-- 🌟 将外层 div 改为 NuxtLink，并移除内部重复的 NuxtLink -->
  <NuxtLink 
    :to="product.path" 
    class="group block cursor-pointer bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full overflow-hidden"
  >
    <!-- 图片区域：保持 4:3 比例 -->
    <div class="relative aspect-[4/3] overflow-hidden bg-slate-50">
      <img 
        :src="product?.meta?.image || '/img/placeholder.jpg'" 
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    <!-- 内容区域：极致紧凑 -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- 标题：悬浮变色 -->
      <h3 class="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
        {{ product.title }}
      </h3>
      
      <!-- 描述 -->
      <p class="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2 flex-grow">
        {{ product.description }}
      </p>

      <!-- 底部：仅保留箭头视觉交互 -->
      <div class="flex justify-end mt-auto">
        <div class="text-slate-300 group-hover:text-blue-600 transition-all duration-300 ease-out flex items-center">
          <!-- 🌟 箭头位移交互 -->
          <ArrowRight class="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

defineProps({
  product: {
    type: Object as () => any,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>