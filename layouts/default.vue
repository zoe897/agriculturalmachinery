<template>
  <NuxtLoadingIndicator :duration="1000" :throttle="0" :height="5" />

  <HeaderNavbar />

  <main class="mt-24">
    <slot />
  </main>

  <FooterBlock />
</template>

<script setup>
import HeaderNavbar from '~/components/Header/Navbar.vue'
import FooterBlock from '~/components/Footer/Block.vue'
</script>

<style scoped>
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
</style>