<template>
  <div class="dashboard-page">
    <HamburgerMenu />
    <h1>Welcome, {{ store.user?.username }}</h1>
    <section>
      <h2>Your Accounts</h2>
      <ul>
        <li v-for="a in store.accounts" :key="a.id">
          {{ a.type }} - {{ a.iban }} : {{ a.balance.toFixed(2) }} €
        </li>
      </ul>
    </section>
    <section>
      <button @click="goPayments">Make Payment</button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import store from "../store";
import HamburgerMenu from "../components/HamburgerMenu.vue";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const router = useRouter();
    const goPayments = () => router.push("/dashboard/payments");

    return { store, goPayments };
  },
});
</script>

<style scoped>
.dashboard-page { padding: 2rem; }
button { margin-top: 1rem; }
</style>
