<template>
  <div>

    <HeaderNavbar />

    <main class="mt-24">
      <slot />
    </main>

    <FooterBlock />

    <a
      href="https://wa.me/8619743003775/8613066010625"
      target="_blank"
      class="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded-full"
    >
      WhatsApp
    </a>

  </div>
</template>

<script setup>
import HeaderNavbar from '~/components/Header/Navbar.vue'
import FooterBlock from '~/components/Footer/Block.vue'
</script>