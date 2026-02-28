<template>
  <div class="profile-page">
    <HamburgerMenu />
    <h1>Profile</h1>
    <section>
      <h2>Change Username</h2>
      <input v-model="newUsername" maxlength="10" />
      <button @click="changeUsername">Save</button>
    </section>
    <section>
      <h2>Change PIN</h2>
      <input v-model="newPin" type="password" maxlength="6" />
      <button @click="changePin">Save</button>
    </section>
    <section>
      <h2>Support Chat</h2>
      <input v-model="supportMessage" placeholder="Type message..." />
      <button @click="sendSupport">Send</button>
      <ul>
        <li v-for="msg in messages" :key="msg.id">{{ msg.content }} ({{ msg.createdAt }})</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HamburgerMenu from "../components/HamburgerMenu.vue";
import { auth } from "../firebase/config";
import { updateUsername, updatePin } from "../firebase/profileService";
import { sendSupportMessage } from "../firebase/supportService";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const router = useRouter();
    const newUsername = ref("");
    const newPin = ref("");
    const supportMessage = ref("");
    const messages = ref<any[]>([]);

    onMounted(() => {
      if (!auth.currentUser) return router.push("/login");
      newUsername.value = auth.currentUser.email?.split("@")[0] || "";
    });

    const changeUsernameFn = async () => {
      if (!auth.currentUser) return;
      await updateUsername(auth.currentUser.uid, newUsername.value);
      alert("Username updated!");
    };

    const changePinFn = async () => {
      if (!auth.currentUser) return;
      if (!/^\d{6}$/.test(newPin.value)) return alert("PIN must be 6 digits");
      await updatePin(newPin.value);
      alert("PIN updated!");
    };

    const sendSupportFn = async () => {
      if (!auth.currentUser) return;
      const msg = await sendSupportMessage(auth.currentUser.uid, supportMessage.value);
      messages.value.push(msg);
      supportMessage.value = "";
    };

    return { newUsername, newPin, changeUsername: changeUsernameFn, changePin: changePinFn, supportMessage, sendSupport: sendSupportFn, messages };
  },
});
</script>
