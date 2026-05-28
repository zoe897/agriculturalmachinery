<script setup>
useSeoMeta({
  title: 'Agricultural & Construction Machinery Supplier | Jinan Hecoth',
  description: 'With 17+ years of experience, Jinan Hecoth specializes in high-quality disc blades, tractors, and irrigation systems with professional mixed container consolidation.'
})
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-400">

    <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-900">
      <div class="absolute inset-0 z-0">
        <img 
          src="/img/hero-bg.jpg" 
          alt="Hecoth Machinery Supply Chain" 
          class="w-full h-full object-cover scale-105"
        ></img>
        <div class="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10 text-center max-w-5xl">
        <div class="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full backdrop-blur-md mb-6">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-emerald-400 text-xs font-semibold tracking-widest uppercase">17+ Years Industry Expertise</span>
        </div>
        
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
          Your Strategic Partner in <br/>
          <span class="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Machinery Supply Chains</span>
        </h1>
        
        <p class="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Founded by Zoe, Jinan Hecoth acts as your expert eyes and ears in China. We integrate premium agricultural implements, tractors, and irrigation drip tapes with professional mixed container consolidation.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/products" class="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 transition-all">
            Browse Product Catalog
          </NuxtLink>
          <NuxtLink to="/contact" class="bg-slate-900 text-slate-300 border border-slate-700/80 backdrop-blur-md px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
            Request LCL Quote
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-950">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Integrated Product Portfolio</h2>
          <p class="text-slate-400">Premium industrial and agricultural solutions adapted to diverse farming standards globally.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
            <div class="h-52 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=600&auto=format&fit=crop" alt="Agricultural Implements" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></img>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Agricultural Machinery</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">Heavy-duty tractors, disc harrows, and high-performance ploughs built for challenging soils.</p>
              <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">Explore Implements &rarr;</NuxtLink>
            </div>
          </div>

          <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
            <div class="h-52 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1579535812821-c1ef34cc118a?q=80&w=600&auto=format&fit=crop" alt="Construction Equipment" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></img>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Construction Machinery</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">Compact mini-excavators, wheel loaders, and robust handling attachments for farming infrastructure.</p>
              <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">Explore Construction &rarr;</NuxtLink>
            </div>
          </div>

          <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
            <div class="h-52 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1563514223741-21b45287a431?q=80&w=600&auto=format&fit=crop" alt="Plant Protection" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></img>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Plant Protection & Drip</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">Precision irrigation drip tapes, water pumps, and eco-friendly cooling equipment.</p>
              <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">Explore Plant Care &rarr;</NuxtLink>
            </div>
          </div>

          <div class="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
            <div class="h-52 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop" alt="Premium Spare Parts" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"></img>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Premium Spare Parts</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">Stable supply of wear-resistant boron steel disc blades, tillers, and replacement gears.</p>
              <NuxtLink to="/products" class="text-xs font-semibold text-emerald-400 inline-flex items-center gap-1 hover:underline">Explore Spare Parts &rarr;</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-slate-900/30 border-t border-slate-800/60">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-white mb-6">Our Strategic Advantage: <br/><span class="text-emerald-400">Mixed Container Consolidation</span></h2>
            <p class="text-slate-300 mb-6 leading-relaxed">
              Managing imports from multiple Chinese factories can be a logistical headache for global buyers. At Hecoth, we handle the integration for you. We aggregate your machinery and parts into a single optimized container.
            </p>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="mt-1 bg-emerald-500/20 text-emerald-400 p-1 rounded text-xs">✓</div>
                <p class="text-slate-400 text-sm"><strong>Zero Wasted Space:</strong> We nest small spare parts inside large implement frames to maximize space utilization and minimize sea freight.</p>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 bg-emerald-500/20 text-emerald-400 p-1 rounded text-xs">✓</div>
                <p class="text-slate-400 text-sm"><strong>Strict pre-shipment Quality Control:</strong> Zoe personally reviews soil and tech specifications on-site to guarantee 100% compliance.</p>
              </div>
            </div>
          </div>
          <div class="relative bg-slate-800/40 p-2 rounded-2xl border border-slate-700/50">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" alt="Container Sourcing Consolidation" class="rounded-xl w-full object-cover h-80"></img>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 text-center bg-gradient-to-t from-slate-950 to-slate-900 border-t border-slate-800/50">
      <div class="container mx-auto px-6 max-w-3xl">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">Direct Access to Sourcing Expertise</h2>
        <p class="text-slate-400 mb-8">Skip the junior salespeople. Deal directly with Zoe, a 17+ year agricultural machinery export veteran, to optimize your supply chain.</p>
        <div class="flex justify-center gap-4">
          <a href="mailto:zoe@annetop.com" class="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 transition-all">
            Email Zoe Directly
          </a>
        </div>
      </div>
    </section>

  </main>
</template>