<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label>Username (10 digits)</label>
      <input v-model="username" type="text" maxlength="10" />
      <label>PIN (6 digits)</label>
      <input v-model="pin" type="password" maxlength="6" />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import store from "../store";

export default defineComponent({
  setup() {
    const router = useRouter();
    const username = ref("");
    const pin = ref("");
    const error = ref("");

    const login = async () => {
      // Simuloi Firebase call
      if (username.value === "1234567890" && pin.value === "123456") {
        store.user = { id: "user1", username: username.value };
        router.push("/dashboard");
      } else {
        error.value = "Invalid credentials";
      }
    };

    return { username, pin, login, error };
  },
});
</script>

<style scoped>
.login-page { padding: 2rem; }
input { display: block; margin-bottom: 1rem; }
.error { color: red; }
</style>
