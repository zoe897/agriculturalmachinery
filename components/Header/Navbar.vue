<template>
    <nav :class="[
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]',
        isScrolled
            ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg' 
            : 'bg-transparent py-2'
    ]">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-24">
                <!-- 1. Logo Area -->
                <div class="transition-all duration-500" :class="isScrolled ? 'scale-95' : 'scale-100'">
                    <NuxtLink to="/" class="flex items-center gap-3 py-4 group">
                        <div class="flex h-14 md:h-20 items-center justify-center">
                            <img v-if="siteConfig?.logo?.logoUrl" :src="siteConfig?.logo?.logoUrl" alt="HECOTH"
                                class="h-full w-auto object-contain filter drop-shadow-md">
                        </div>
                        <span v-if="siteConfig?.logo?.logoName" class="text-2xl font-extrabold text-white tracking-tight uppercase">
                            {{ siteConfig?.logo?.logoName }}
                        </span>
                    </NuxtLink>
                </div>

                <!-- 2. Desktop Navigation -->
                <div class="hidden md:flex items-center h-full space-x-2">
                    <div v-for="(item, index) in navItems" :key="index" class="relative group h-full flex items-center">
                        <NuxtLink :to="item.href"
                            class="text-white/90 hover:text-blue-400 transition-all px-4 py-2 rounded-md hover:bg-white/5 font-medium text-base flex items-center gap-1">
                            {{ item.label }}
                            <ChevronDown v-if="item.hasDropdown" class="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                        </NuxtLink>

                        <!-- Dropdown Menu -->
                        <div v-if="item.hasDropdown" 
                             class="absolute top-[80%] left-0 w-52 bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-2 border border-white/10 z-[200]">
                            <div class="absolute -top-4 left-0 w-full h-4"></div>
                            <NuxtLink v-for="(subItem, subIndex) in item.subItems" :key="subIndex" :to="subItem.href"
                                class="block px-5 py-3 text-sm hover:bg-white/10 hover:text-blue-400 transition-colors border-b border-white/5 last:border-b-0 font-medium">
                                {{ subItem.label }}
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- 3. Desktop CTA Button -->
                <div class="hidden md:flex items-center gap-4">
                    <NuxtLink to="/contact"
                        class="inline-flex items-center gap-2 px-7 py-3 rounded-md font-bold transition-all duration-300 bg-white text-[#001151] hover:bg-blue-50 active:scale-95">
                        <span class="text-sm uppercase tracking-wider">Inquiry Now</span>
                        <ArrowRight class="w-4 h-4" />
                    </NuxtLink>
                </div>

                <!-- 4. Mobile Toggle -->
                <div class="md:hidden">
                    <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white p-2">
                        <X v-if="mobileMenuOpen" class="w-8 h-8" />
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- 5. Mobile Menu Overlay -->
        <Transition name="fade">
            <div v-if="mobileMenuOpen" class="md:hidden fixed inset-0 top-0 z-[99] bg-slate-900/98 backdrop-blur-2xl">
                <div class="container mx-auto px-6 py-24">
                    <div v-for="(item, index) in navItems" :key="index" class="border-b border-white/10 last:border-0">
                        <div class="flex items-center justify-between py-5">
                            <NuxtLink :to="item.href" @click="mobileMenuOpen = false" class="text-white font-bold text-xl uppercase">{{ item.label }}</NuxtLink>
                            <button v-if="item.hasDropdown" @click="toggleMobileDropdown(index)" class="p-2 text-white/50">
                                <ChevronDown :class="{ 'rotate-180': mobileDropdowns[index] }" class="w-6 h-6 transition-transform" />
                            </button>
                        </div>
                        <div v-if="item.hasDropdown && mobileDropdowns[index]" class="pb-6 pl-4 space-y-4">
                            <NuxtLink v-for="(subItem, subIndex) in item.subItems" :key="subIndex" :to="subItem.href" @click="mobileMenuOpen = false"
                                class="block text-white/70 text-lg border-l-2 border-white/20 pl-4 uppercase font-medium">{{ subItem.label }}</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, onUnmounted } from 'vue'
import { X, ChevronDown, ArrowRight } from 'lucide-vue-next'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const mobileDropdowns = ref<Record<number, boolean>>({})
const siteConfig = ref({ logo: { logoName: '', logoUrl: '' } })

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

const { data: navData } = await useProductsNav()

const navItems = computed(() => {
    const rootNode = navData.value?.[0]
    const base = [{ label: 'Home', href: '/' }]
    if (rootNode) {
        base.push({
            label: rootNode.title,
            href: rootNode.path,
            hasDropdown: true,
            subItems: rootNode.children?.map(child => ({ label: child.title, href: child.path })) || []
        })
    }
    return [...base, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]
})

const toggleMobileDropdown = (index: number) => {
    mobileDropdowns.value[index] = !mobileDropdowns.value[index]
}

watch(mobileMenuOpen, (val) => {
    if (process.client) document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(async () => {
    try {
        const res = await fetch('/setting.json')
        if (res.ok) siteConfig.value = await res.json()
    } catch (e) {}
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>