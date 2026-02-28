<template>
  <div class="dashboard-page">
    <HamburgerMenu />
    <h1>Welcome, {{ user?.username }}</h1>
    <section>
      <h2>Your Accounts</h2>
      <ul>
        <li v-for="a in accounts" :key="a.id">{{ a.type }} - {{ a.iban }} : {{ a.balance.toFixed(2) }} €</li>
      </ul>
    </section>
    <section>
      <button @click="goPayments">Make Payment</button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import HamburgerMenu from "../components/HamburgerMenu.vue";
import { getUserAccounts } from "../firebase/accountService";
import { auth } from "../firebase/config";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const router = useRouter();
    const accounts = ref<any[]>([]);
    const user = ref<any>(null);

    const goPayments = () => router.push("/dashboard/payments");

    onMounted(async () => {
      if (auth.currentUser) {
        user.value = { uid: auth.currentUser.uid, username: auth.currentUser.email?.split("@")[0] };
        accounts.value = await getUserAccounts(auth.currentUser.uid);
      } else {
        router.push("/login");
      }
    });

    return { accounts, goPayments, user };
  },
});
</script>.dashboard-page { padding: 2rem; }
button { margin-top: 1rem; }
</style>
