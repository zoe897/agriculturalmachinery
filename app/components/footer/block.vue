<template>
    <footer class="bg-[#f8fafc] ">

        <div class="container mx-auto px-4 pt-16 pb-8">
            <!-- 核心内容区：12 栅格系统 -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                <!-- 1. 品牌信息区 (占据 5 列) -->
                <div class="lg:col-span-5 pr-0 lg:pr-12">
                    <NuxtLink to="/" class="inline-flex items-center gap-3 mb-6 group">
                        <!-- 更加简洁的 Logo 容器 -->
                        <div class="flex w-10 h-10 items-center justify-center">
                            <img v-if="siteConfig?.logo?.logoUrl" :src="siteConfig?.logo?.logoUrl" alt="Company Logo"
                                class="w-full h-full object-contain">
                        </div>
                        <span class="text-2xl font-black text-[#001151] tracking-tight uppercase">
                            {{ siteConfig?.logo?.logoName || 'BRAND' }}
                        </span>
                    </NuxtLink>

                    <p class="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
                        {{ siteConfig?.footer?.description || 'financial solutions to help your business grow globally.'
                        }}
                    </p>


                </div>

                <!-- 占位空白列 (实现视觉呼吸感) -->
                <div class="hidden lg:block lg:col-span-1"></div>

                <!-- 2. 快速链接 (占据 2 列) -->
                <div class="lg:col-span-2">
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">{{ companyTitle }}</h3>
                    <ul class="flex flex-col space-y-4">
                        <li v-for="(item, index) in companyLinks" :key="index">
                            <NuxtLink :to="item.href"
                                class="text-gray-500 hover:text-[#001151] hover:underline underline-offset-4 transition-all duration-200">
                                {{ item.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- 3. 联系方式 (占据 4 列) -->
                <div class="lg:col-span-4">
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Contact Us</h3>

                    <ul class="flex flex-col space-y-6">
                        <!-- 电话 -->
                        <li class="flex items-start gap-4">

                            <div class="w-8 h-8 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center">
                                <Phone class="w-4 h-4" />
                            </div>
                            <div>
                                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                                <a :href="`tel:${siteConfig?.base?.phone}`"
                                    class="text-gray-700 font-medium hover:text-[#001151] transition-colors">
                                    {{ siteConfig?.base?.phone || '+86 (136) 5661-7631' }}
                                </a>
                            </div>
                        </li>

                        <!-- 邮箱 -->
                        <li class="flex items-start gap-4">
                            <div class="w-8 h-8 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center">
                                <Mail class="w-4 h-4" />
                            </div>
                            <div>
                                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Email</p>
                                <a :href="`mailto:${siteConfig?.base?.email}`"
                                    class="text-gray-700 font-medium hover:text-[#001151] transition-colors">
                                    {{ siteConfig?.base?.email || 'hello@company.com' }}
                                </a>
                            </div>
                        </li>

                        <!-- 地址 -->
                        <li class="flex items-start gap-4">
                            <div class="w-8 h-8 bg-blue-50 text-blue-600 rounded-md flex items-center justify-center">
                                <MapPin class="w-4 h-4" />
                            </div>
                            <div>
                                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Head Office
                                </p>
                                <p class="text-gray-700 leading-relaxed">
                                    {{ siteConfig?.base?.address || '123 Business Avenue, Tech District, City' }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Footer Bottom: 底部版权区 -->
            <div class="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-gray-500 text-sm">
                    &copy; {{ new Date().getFullYear() }} <span class="font-semibold text-gray-900">{{
                        siteConfig?.base?.companyName || 'Company' }}</span>. All rights reserved.
                </div>

                <div class="flex items-center gap-4 text-sm">
                    <NuxtLink to="/" class="text-gray-500 hover:text-[#001151] transition-colors">
                        Terms & Conditions
                    </NuxtLink>
                    <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                    <a href="https://www.daddytemplate.com" target="_blank"
                        class="text-gray-400 hover:text-gray-800 transition-colors">
                        Powered by <span class="font-medium">DaddyTemplate</span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入 Lucide 图标
import { Github, Twitter, Facebook, Phone, Mail, MapPin } from 'lucide-vue-next'

const siteConfig = ref<Record<string, any>>({})

onMounted(async () => {
    try {
        const response = await fetch('/setting.json')
        if (response.ok) {
            const data = await response.json()
            siteConfig.value = { ...siteConfig.value, ...data }
        }
    } catch (e) {
        console.warn("Setting.json not found")
    }
})

defineProps({
    companyTitle: {
        type: String,
        default: 'Company'
    },
    companyLinks: {
        type: Array as () => Array<{
            label: string
            href: string
        }>,
        default: () => [
            { label: 'Home', href: '/' },
            { label: 'About us', href: '/about' },
            { label: 'Products', href: '/products' },
            { label: 'Contact', href: '/contact' }
        ]
    }
});
</script>