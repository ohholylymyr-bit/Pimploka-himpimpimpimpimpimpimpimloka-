<template>
  <div class="register-page">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <label>Username (10 digits)</label>
      <input v-model="username" type="text" maxlength="10" />
      <label>PIN (6 digits)</label>
      <input v-model="pin" type="password" maxlength="6" />
      <button type="submit">Register</button>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
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
    const message = ref("");

    const register = async () => {
      try {
        if (!/^\d{10}$/.test(username.value)) throw new Error("Username must be 10 digits");
        if (!/^\d{6}$/.test(pin.value)) throw new Error("PIN must be 6 digits");

        // Simuloidaan Firebase call
        store.user = { id: "user" + username.value, username: username.value };
        message.value = "Registration successful!";
        setTimeout(() => router.push("/dashboard"), 1000);
      } catch (err: any) {
        error.value = err.message;
      }
    };

    return { username, pin, register, error, message };
  },
});
</script>

<style scoped>
.register-page { padding: 2rem; }
input { display: block; margin-bottom: 1rem; }
.message { color: green; }
.error { color: red; }
</style>
