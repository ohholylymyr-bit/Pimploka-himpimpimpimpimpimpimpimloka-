<template>
  <div class="home-page">
    <h1>Welcome to HenryBankki</h1>
    <nav>
      <button @click="goLogin">Login</button>
    </nav>
    <section class="articles">
      <h2>Latest Articles</h2>
      <ul>
        <li v-for="a in articles" :key="a.id">{{ a.title }} - {{ a.date }}</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const articles = [
      { id: 1, title: "HenryBankki launches new crypto feature", date: "20.02.2026" },
      { id: 2, title: "Loans now faster than ever", date: "18.02.2026" },
    ];

    const goLogin = () => router.push("/login");

    return { articles, goLogin };
  },
});
</script>

<style scoped>
.home-page { padding: 2rem; }
button { margin-top: 1rem; }
.articles { margin-top: 2rem; }
</style>
