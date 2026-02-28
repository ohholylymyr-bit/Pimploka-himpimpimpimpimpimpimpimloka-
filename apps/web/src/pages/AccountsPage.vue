<template>
  <div class="accounts-page">
    <HamburgerMenu />
    <h1>Your Accounts</h1>
    <ul>
      <li v-for="a in store.accounts" :key="a.id">
        <strong>{{ a.type }}:</strong> {{ a.iban }} - {{ a.balance.toFixed(2) }} €
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../store";
import HamburgerMenu from "../components/HamburgerMenu.vue";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    return { store };
  }
});
</script>

<style scoped>
.accounts-page { padding: 2rem; }
ul { list-style-type: none; padding: 0; }
li { margin: 0.5rem 0; }
</style>
