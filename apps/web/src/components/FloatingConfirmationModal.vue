<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <p>{{ message }}</p>
      <button @click="confirm">Yes</button>
      <button @click="cancel">No</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    visible: { type: Boolean, required: true },
    message: { type: String, required: true },
  },
  emits: ["confirm", "cancel"],
  setup(props, { emit }) {
    const confirm = () => emit("confirm");
    const cancel = () => emit("cancel");
    return { confirm, cancel };
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background-color: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
}
.modal {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
}
.modal button { margin: 0 0.5rem; }
</style>
