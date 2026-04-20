<template>
  <div>

    <section class="p-10 bg-blue-900 text-white">
      <h1 class="text-3xl font-bold">
        Agricultural Machinery Factory China
      </h1>

      <p class="mt-3">
        17+ Years Manufacturer | OEM | Global Export
      </p>

      <a href="#inquiry" class="mt-5 inline-block bg-orange-500 px-5 py-2">
        Get Quote
      </a>
    </section>

    <section class="p-10">
      <h2 class="text-2xl font-bold">Hot Products</h2>

      <div class="grid grid-cols-2 gap-4 mt-5">

        <NuxtLink to="/products/tractor">Tractor</NuxtLink>
        <NuxtLink to="/products/seeder">Seeder</NuxtLink>
        <NuxtLink to="/products/plow">Plow</NuxtLink>
        <NuxtLink to="/products/disc-harrow">Disc Harrow</NuxtLink>

      </div>
    </section>

    <section id="inquiry" class="p-10 bg-gray-100">
      <h2 class="text-2xl font-bold">Get Free Quote</h2>

      <form class="mt-5 flex flex-col gap-3">
        <input placeholder="Name" class="p-2 border" />
        <input placeholder="Email / WhatsApp" class="p-2 border" />
        <textarea placeholder="Requirement" class="p-2 border"></textarea>

        <button class="bg-green-500 text-white p-2">
          Send Inquiry
        </button>
      </form>
    </section>

  </div>
</template>