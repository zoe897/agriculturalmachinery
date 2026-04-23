<template>
  <div class="max-w-4xl mx-auto py-10">

    <h1 class="text-3xl font-bold mb-6">
      {{ slug }}
    </h1>

    <p class="mb-10 text-gray-600">
      Contact us for price and specifications.
    </p>

    <!-- 询盘组件（关键） -->
    <InquiryForm :product="slug" />

  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const slug = route.params.slug
</script>