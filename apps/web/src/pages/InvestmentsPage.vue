<template>
  <div class="investments-page">
    <HamburgerMenu />
    <h1>Investments</h1>

    <section>
      <h2>Cryptocurrencies</h2>
      <ul>
        <li v-for="c in crypto" :key="c.id">{{ c.name }} : {{ c.price }} €</li>
      </ul>
    </section>

    <section>
      <h2>Finnish Investments</h2>
      <ul>
        <li v-for="f in finnish" :key="f.id">{{ f.name }} : {{ f.price }} €</li>
      </ul>
    </section>

    <section>
      <h2>Global Stocks</h2>
      <ul>
        <li v-for="s in global" :key="s.id">{{ s.name }} : {{ s.price }} €</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HamburgerMenu from "../components/HamburgerMenu.vue";
import { auth } from "../firebase/config";
import { getCryptoPrices, getFinnishInvestments, getGlobalStocks } from "../firebase/investmentsService";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const router = useRouter();
    const crypto = ref<any[]>([]);
    const finnish = ref<any[]>([]);
    const global = ref<any[]>([]);

    onMounted(async () => {
      if (!auth.currentUser) return router.push("/login");
      crypto.value = await getCryptoPrices();
      finnish.value = await getFinnishInvestments();
      global.value = await getGlobalStocks();
    });

    return { crypto, finnish, global };
  },
});
</script>
