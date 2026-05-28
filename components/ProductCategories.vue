<template>
  <section class="py-24 bg-slate-950">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Our Product Range</h2>
        <p class="text-slate-400">Premium industrial and agricultural machinery integration adapted to global farming standards.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- 卡片 1: 农业机械 -->
        <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
          <div class="h-52 overflow-hidden relative">
            <img src="/img/products/agri-machinery.jpg" alt="Agricultural Machinery" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Agricultural Machinery</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">Heavy-duty tractors, disc harrows, and ploughs designed for efficiency and extreme durability.</p>
            <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">View Details &rarr;</NuxtLink>
          </div>
        </div>

        <!-- 卡片 2: 工程机械 -->
        <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
          <div class="h-52 overflow-hidden relative">
            <img src="/img/products/construction.jpg" alt="Construction Machinery" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Construction Machinery</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">Reliable engineering equipment, compact mini-excavators, and robust handling attachments.</p>
            <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">View Details &rarr;</NuxtLink>
          </div>
        </div>

        <!-- 卡片 3: 植保与滴灌 -->
        <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
          <div class="h-52 overflow-hidden relative">
            <img src="/img/products/irrigation.jpg" alt="Plant Protection" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Plant Protection</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">Precision irrigation drip tapes, crop protection sprayers, and industrial cooling equipment.</p>
            <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">View Details &rarr;</NuxtLink>
          </div>
        </div>

        <!-- 卡片 4: 机械零配件 -->
        <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
          <div class="h-52 overflow-hidden relative">
            <img src="/img/products/spare-parts.jpg" alt="Spare Parts" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Spare Parts</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">Stable supply of wear-resistant boron steel disc blades, harrow parts, and bearing assemblies.</p>
            <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">View Details &rarr;</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>