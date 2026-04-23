<template>
  <div>

    <!-- 页面内容 -->
    <slot />

    <!-- WhatsApp浮窗（外贸必备） -->
    <a
      href="https://wa.me/861234567890?text=Hello%20I%20need%20a%20quote"
      class="whatsapp"
      target="_blank"
    >
      WhatsApp
    </a>

  </div>
</template>

<style scoped>
.whatsapp {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #25D366;
  color: white;
  padding: 12px 16px;
  border-radius: 50px;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  text-decoration: none;
}
</style>