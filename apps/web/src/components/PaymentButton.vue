<template>
  <button @click="$emit('pay')" class="payment-button">
    Pay
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaymentButton"
});
</script>

<style scoped>
.payment-button {
  background-color: #0066ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}
.payment-button:hover { background-color: #0051cc; }
</style>
