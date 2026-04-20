<template>
  <div>

    <!-- 🔥 HERO（第一转化点） -->
    <section class="hero">
      <h1 class="title">
        China Agricultural Machinery Manufacturer
      </h1>

      <p class="sub">
        17+ Years Factory | OEM Service | Global Export
      </p>

      <div class="btn-group">
        <a href="#inquiry" class="btn-primary">Get Free Quote</a>
        <a :href="whatsappLink" target="_blank" class="btn-whatsapp">
          WhatsApp Now
        </a>
      </div>
    </section>

    <!-- 🧠 TRUST（建立信任） -->
    <section class="trust">
      <h2>Trusted Global Supplier</h2>

      <div class="trust-grid">
        <div>✔ 17+ Years Manufacturing</div>
        <div>✔ CE / ISO Certified</div>
        <div>✔ Export to 30+ Countries</div>
        <div>✔ OEM & Custom Design</div>
      </div>
    </section>

    <!-- 🔥 HOT PRODUCTS（精选产品） -->
    <section class="products">
      <h2>Hot Products</h2>

      <div class="product-grid">

        <NuxtLink to="/products/disc-harrow">
          <div class="card">
            <img src="/images/disc.jpg" />
            <p>Disc Harrow</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/products/tractor">
          <div class="card">
            <img src="/images/tractor.jpg" />
            <p>Tractor</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/products/seeder">
          <div class="card">
            <img src="/images/seeder.jpg" />
            <p>Seeder</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/products/plow">
          <div class="card">
            <img src="/images/plow.jpg" />
            <p>Plow</p>
          </div>
        </NuxtLink>

      </div>
    </section>

    <!-- 💰 WHY US（成交理由） -->
    <section class="why">
      <h2>Why Choose Us</h2>

      <ul>
        <li>✔ Factory Direct Price</li>
        <li>✔ Fast Delivery (7–20 Days)</li>
        <li>✔ OEM Customization</li>
        <li>✔ Strict Quality Control</li>
        <li>✔ Export Experience</li>
      </ul>
    </section>

    <!-- 🏭 FACTORY（信任增强） -->
    <section class="factory">
      <h2>Our Factory</h2>
      <p>Professional agricultural machinery manufacturer in China</p>

      <img src="/images/factory.jpg" />
    </section>

    <!-- 📩 INQUIRY（核心转化🔥） -->
    <section id="inquiry" class="inquiry">

      <h2>Get Free Quote Now</h2>

      <form class="form">
        <input placeholder="Your Name" />
        <input placeholder="Email / WhatsApp" />
        <textarea placeholder="Tell us what you need"></textarea>

        <button type="submit">Send Inquiry</button>
      </form>

      <a :href="whatsappLink" target="_blank" class="wa-btn">
        Chat on WhatsApp
      </a>

    </section>

    <!-- 📱 FLOATING WHATSAPP（强转化） -->
    <a :href="whatsappLink" target="_blank" class="float-wa">
      WhatsApp
    </a>

  </div>
</template>

<script setup>
const whatsappLink = "https://wa.me/8619743003775/813066010625"

// SEO（稳定版）
useSeoMeta({
  title: "Agricultural Machinery Manufacturer in China",
  description: "Factory supplier of agricultural machinery with OEM service and global export.",
})
</script>

<style scoped>

/* ===== HERO ===== */
.hero {
  padding: 80px 20px;
  text-align: center;
  background: #001151;
  color: white;
}

.title {
  font-size: 36px;
  font-weight: 800;
}

.sub {
  margin-top: 10px;
  opacity: 0.8;
}

.btn-group {
  margin-top: 20px;
}

.btn-primary {
  background: #ea580c;
  color: white;
  padding: 12px 20px;
  margin-right: 10px;
}

.btn-whatsapp {
  background: #25D366;
  color: white;
  padding: 12px 20px;
}

/* ===== TRUST ===== */
.trust {
  padding: 60px 20px;
  text-align: center;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-width: 600px;
  margin: auto;
}

/* ===== PRODUCTS ===== */
.products {
  padding: 60px 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  border: 1px solid #eee;
  padding: 10px;
  text-align: center;
}

/* ===== WHY ===== */
.why {
  padding: 60px 20px;
  background: #f5f5f5;
}

/* ===== FACTORY ===== */
.factory {
  padding: 60px 20px;
  text-align: center;
}

/* ===== INQUIRY ===== */
.inquiry {
  padding: 80px 20px;
  text-align: center;
}

.form {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ===== FLOAT WA ===== */
.float-wa {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #25D366;
  color: white;
  padding: 12px 16px;
  border-radius: 50px;
}
</style>