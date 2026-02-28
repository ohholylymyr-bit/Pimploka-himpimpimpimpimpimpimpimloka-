<template>
  <div class="investments-page">
    <HamburgerMenu />
    <h1>Investments</h1>

    <section>
      <h2>Crypto</h2>
      <ul>
        <li v-for="c in cryptos" :key="c.id">{{ c.name }}: {{ c.price.toFixed(2) }} €</li>
      </ul>
    </section>

    <section>
      <h2>Global Stocks</h2>
      <ul>
        <li v-for="s in stocks" :key="s.id">{{ s.name }}: {{ s.price.toFixed(2) }} €</li>
      </ul>
    </section>

    <section>
      <h2>Finnish Investments</h2>
      <ul>
        <li v-for="f in finnish" :key="f.id">{{ f.name }}: {{ f.price.toFixed(2) }} €</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HamburgerMenu from "../components/HamburgerMenu.vue";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const cryptos = ref(Array.from({ length: 10 }, (_, i) => ({ id: `c${i}`, name: `Crypto ${i+1}`, price: Math.random()*100 })));
    const stocks = ref(Array.from({ length: 50 }, (_, i) => ({ id: `s${i}`, name: `Stock ${i+1}`, price: Math.random()*200 })));
    const finnish = ref(Array.from({ length: 20 }, (_, i) => ({ id: `f${i}`, name: `Finnish ${i+1}`, price: Math.random()*50 })));

    return { cryptos, stocks, finnish };
  }
});
</script>

<style scoped>
.investments-page { padding: 2rem; }
section { margin-bottom: 2rem; }
ul { list-style-type: none; padding: 0; }
li { margin: 0.25rem 0; }
</style>
