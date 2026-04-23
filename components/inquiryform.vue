<template>
  <form @submit.prevent="submit" class="space-y-4">

    <input v-model="form.name" placeholder="Your Name" class="input" required />
    <input v-model="form.email" placeholder="Email" class="input" required />
    <input v-model="form.country" placeholder="Country" class="input" />

    <input v-model="form.product" class="input bg-gray-100" readonly />

    <textarea v-model="form.message" placeholder="Message" class="input" />

    <button class="btn">
      Get Quote
    </button>

  </form>
</template>

<script setup>
const props = defineProps({
  product: {
    type: String,
    default: ''
  }
})

const form = reactive({
  name: '',
  email: '',
  country: '',
  product: props.product,
  message: ''
})

const submit = async () => {
  const res = await $fetch('/api/inquiry', {
    method: 'POST',
    body: form
  })

  if (res.success) {
    window.location.href = '/thank-you'
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.btn {
  width: 100%;
  background: #16a34a;
  color: white;
  padding: 12px;
  border-radius: 6px;
}
</style>