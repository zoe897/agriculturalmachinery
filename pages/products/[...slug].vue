<template>
  <div class="max-w-4xl mx-auto py-10 px-6">

    <h1 class="text-3xl font-bold mb-6">
      {{ slug }}
    </h1>

    <p class="text-gray-600 mb-10">
      Contact us for price, specification and bulk order support.
    </p>

    <!-- 询盘表单 -->
    <InquiryForm :product="slug" />

  </div>
</template>

<script setup>
const route = useRoute()

// ✅ 只声明一次
const slug = route.params.slug
</script>