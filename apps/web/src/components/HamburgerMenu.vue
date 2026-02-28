<template>
  <div class="hamburger-menu">
    <button @click="toggleMenu">☰</button>
    <div v-if="open" class="menu">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/dashboard/accounts">Accounts</router-link>
      <router-link to="/dashboard/payments">Payments</router-link>
      <router-link to="/dashboard/profile">Profile</router-link>
      <router-link to="/dashboard/investments">Investments</router-link>
      <router-link to="/dashboard/loans">Loans</router-link>
      <router-link to="/dashboard/cards">Cards</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const open = ref(false);
    const toggleMenu = () => (open.value = !open.value);
    return { open, toggleMenu };
  }
});
</script>

<style scoped>
.hamburger-menu button { font-size: 1.5rem; }
.menu { display: flex; flex-direction: column; margin-top: 1rem; }
.menu a { margin: 0.5rem 0; text-decoration: none; }
</style>
