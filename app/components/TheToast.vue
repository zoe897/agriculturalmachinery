<!-- app/components/TheToast.vue -->
<script setup>
import { CheckCircle, AlertCircle, Info, X } from 'lucide-vue-next';
const { toasts } = useToast();
</script>

<template>
  <div class="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 w-full max-w-md px-4 pointer-events-none">
    <TransitionGroup 
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="transform translate-x-12 opacity-0 scale-90"
      enter-to-class="transform translate-x-0 opacity-100 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-90"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto relative overflow-hidden flex items-center justify-between gap-4 px-5 py-4 rounded-xl shadow-[0_20px_50px_rgba(0,17,81,0.3)] border backdrop-blur-xl group"
        :class="{
          'bg-[#001151]/90 border-emerald-500/30': toast.type === 'success',
          'bg-[#001151]/90 border-red-500/30': toast.type === 'error',
          'bg-[#001151]/90 border-blue-400/30': toast.type === 'info'
        }"
      >
        <!-- 侧边彩色装饰条 (匹配模板的精致感) -->
        <div 
          class="absolute left-0 top-0 bottom-0 w-1"
          :class="{
            'bg-emerald-500 shadow-[0_0_10px_#10b981]': toast.type === 'success',
            'bg-red-500 shadow-[0_0_10px_#ef4444]': toast.type === 'error',
            'bg-blue-400 shadow-[0_0_10px_#60a5fa]': toast.type === 'info'
          }"
        ></div>

        <div class="flex items-center gap-4">
          <!-- 图标部分：增加了类似 Hero 欢迎条的发光感 -->
          <div 
            class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10"
          >
            <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-400" />
            <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-400" />
            <Info v-else class="w-5 h-5 text-blue-400" />
          </div>
          
          <div class="flex flex-col">
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 text-white mb-0.5">
              {{ toast.type }}
            </span>
            <span class="text-sm font-semibold text-white tracking-wide">
              {{ toast.message }}
            </span>
          </div>
        </div>
        
        <!-- 关闭按钮：更现代的圆形按钮 -->
        <button 
          @click="removeToast(toast.id)" 
          class="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>