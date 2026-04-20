<template>
  <div>
    <ClientOnly>
      <HeaderNavbar />
    </ClientOnly>

    <main class="mt-24">
      <slot />
    </main>

    <FooterBlock />
  </div>
</template>

<script setup>
import HeaderNavbar from '~/components/Header/Navbar.vue'
import FooterBlock from '~/components/Footer/Block.vue'
</script>

<script setup>
/**
 * 严格路径导入
 * 1. Header 已经在你刚才的操作中改为大写
 * 2. Footer 我们即将通过 git mv 改为大写
 */
import HeaderNavbar from '~/components/Header/Navbar.vue'
import FooterBlock from '~/components/Footer/Block.vue' 
</script>

<style scoped>
/* 美化下拉框滚动条 */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
}
.animate-in {
    animation: modal-in 0.3s ease-out forwards;
}
@keyframes modal-in {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}
</style>