<template>
  <div v-if="data">

    <section class="p-10 bg-blue-900 text-white">
      <h1 class="text-3xl font-bold">
        {{ data.title }}
      </h1>

      <p class="mt-2">
        {{ data.description }}
      </p>

      <a
        href="https://wa.me/8619743003775/8613066010625"
        class="mt-4 inline-block bg-green-500 px-4 py-2"
      >
        WhatsApp Quote
      </a>
    </section>

    <section class="p-10">
      <ContentRenderer :value="data" />
    </section>

  </div>
</template>

<script setup>
const route = useRoute()

const { data } = await useAsyncData(() => {
  return queryCollection('products')
    .path(route.path)
    .first()
})
</script>