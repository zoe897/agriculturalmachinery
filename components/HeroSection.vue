<template>
  <section class="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
    <!-- 背景大图 -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/img/hero-bg.jpg" 
        alt="Hecoth Machinery Supply Chain" 
        class="w-full h-full object-cover scale-105"
      />
      <!-- 高级暗色渐变遮罩 -->
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950"></div>
    </div>

    <!-- 内容区域 -->
    <div class="container mx-auto px-6 relative z-10 text-center max-w-5xl">
      <!-- 信任标签 -->
      <div class="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full backdrop-blur-md mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-emerald-400 text-xs font-semibold tracking-widest uppercase">17+ Years Sourcing Expertise</span>
      </div>
      
      <!-- 主标题 -->
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
        Your Strategic Partner in <br/>
        <span class="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Agricultural Supply Chains</span>
      </h1>
      
      <!-- 副标题 -->
      <p class="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
        Founded by Zoe, Jinan Hecoth acts as your expert eyes and ears in China. We integrate premium agricultural implements, spare parts, and irrigation drip tapes with professional container consolidation.
      </p>

      <!-- 呼吁行动按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/products" class="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 transition-all">
          Browse Product Catalog
        </NuxtLink>
        <NuxtLink to="/contact" class="bg-slate-900 text-slate-300 border border-slate-700/80 backdrop-blur-md px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
          Get a Free Quote
        </NuxtLink>
      </div>
    </div>
  </section>
</template>