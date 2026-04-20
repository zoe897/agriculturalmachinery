<template>
  <div>

    <!-- HERO -->
    <section class="hero">
      <div class="overlay">
        <h1>Agricultural Machinery Manufacturer China</h1>
        <p>16+ Years Factory | OEM Service | Global Export</p>

        <a href="#inquiry" class="btn">
          Get Free Quote
        </a>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="section">
      <h2>Hot Products</h2>

      <div class="grid">

        <NuxtLink to="/products/tractor" class="card">
          🚜 Tractor
        </NuxtLink>

        <NuxtLink to="/products/seeder" class="card">
          🌱 Seeder
        </NuxtLink>

        <NuxtLink to="/products/plow" class="card">
          🛠 Plow
        </NuxtLink>

        <NuxtLink to="/products/disc-harrow" class="card">
          ⚙ Disc Harrow
        </NuxtLink>

      </div>
    </section>

    <!-- TRUST -->
    <section class="trust">
      <div>✔ 16+ Years Experience</div>
      <div>✔ CE / ISO Certified</div>
      <div>✔ Export to 30+ Countries</div>
    </section>

    <!-- INQUIRY -->
    <section id="inquiry" class="inquiry">
      <h2>Get Free Quote</h2>

      <form>
        <input placeholder="Name" />
        <input placeholder="Email / WhatsApp" />
        <textarea placeholder="Requirement"></textarea>

        <button type="submit">
          Send Inquiry
        </button>
      </form>
    </section>

  </div>
</template>

<style scoped>

.hero {
  height: 60vh;
  background: #001151;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.btn {
  background: #25D366;
  padding: 12px 20px;
  display: inline-block;
  margin-top: 20px;
  color: white;
  border-radius: 6px;
}

.section {
  padding: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.card {
  padding: 20px;
  background: #f5f5f5;
  text-align: center;
}

.trust {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  background: #f0f0f0;
}

.inquiry {
  padding: 50px;
  background: #001151;
  color: white;
}

input, textarea {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
}

button {
  margin-top: 10px;
  background: #25D366;
  color: white;
  padding: 10px;
  width: 100%;
}
</style>