<template>
  <div class="admin-page">
    <HamburgerMenu />
    <h1>Admin Panel</h1>

    <section>
      <h2>Add Funds to All Accounts</h2>
      <input v-model.number="amount" type="number" placeholder="Amount €" />
      <button @click="addFunds">Add</button>
    </section>

    <section>
      <h2>All Accounts</h2>
      <ul>
        <li v-for="a in accounts" :key="a.id">{{ a.username || a.userId }} : {{ a.balance.toFixed(2) }} €</li>
      </ul>
    </section>

    <section>
      <h2>Support Requests</h2>
      <ul>
        <li v-for="s in supportRequests" :key="s.id">{{ s.message }} ({{ s.status }})</li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HamburgerMenu from "../components/HamburgerMenu.vue";
import { auth } from "../firebase/config";
import { addFundsToAllAccounts, getAllAccounts, getAllSupportRequests } from "../firebase/adminService";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const router = useRouter();
    const amount = ref(0);
    const accounts = ref<any[]>([]);
    const supportRequests = ref<any[]>([]);

    const loadData = async () => {
      if (!auth.currentUser) return router.push("/login");
      accounts.value = await getAllAccounts();
      supportRequests.value = await getAllSupportRequests();
    };

    const addFunds = async () => {
      await addFundsToAllAccounts(amount.value);
      alert("Funds added to all accounts!");
      await loadData();
    };

    onMounted(loadData);

    return { amount, accounts, supportRequests, addFunds };
  },
});
</script>
