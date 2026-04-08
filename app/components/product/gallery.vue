<template>
  <div class="flex flex-col gap-4 w-full ">
    <!-- 大图展示区域 -->
    <div class="w-full aspect-[5/5] bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <transition name="fade" mode="out-in">
        <img 
          :key="images[activeIndex]" 
          :src="images[activeIndex]" 
          class="w-full h-full object-cover"
          alt="Product Detail"
        />
      </transition>
    </div>

    <!-- 小图列表区域 -->
    <div class="grid grid-cols-8 gap-1 md:gap-1">
      <button 
        v-for="(img, index) in images" 
        :key="index"
        @click="activeIndex = index"
        class="aspect-[4/4] rounded-lg overflow-hidden border-2 transition-all duration-300"
        :class="activeIndex === index ? 'border-[#0632d3]  ring-2 ring-[#0632d3]/20' : 'border-transparent hover:border-gray-300'"
      >
        <img :src="img" class="w-full h-full object-cover" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  images: string[]
}>();

const activeIndex = ref(0);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>