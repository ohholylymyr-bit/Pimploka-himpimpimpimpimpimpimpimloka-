<template>
  <div class="payments-page">
    <HamburgerMenu />
    <h1>Make a Payment</h1>
    <form @submit.prevent="submitPayment">
      <label>IBAN:</label>
      <input v-model="iban" type="text" />
      <label>From Account:</label>
      <select v-model="fromAccount">
        <option v-for="a in accounts" :key="a.id" :value="a.id">{{ a.type }} - {{ a.iban }}</option>
      </select>
      <label>Reference/Message:</label>
      <input v-model="reference" type="text" />
      <PaymentButton @pay="showConfirm = true" />
    </form>
    <FloatingConfirmationModal
      :visible="showConfirm"
      message="Do you want to execute the payment?"
      @confirm="confirmPayment"
      @cancel="showConfirm=false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HamburgerMenu from "../components/HamburgerMenu.vue";
import PaymentButton from "../components/PaymentButton.vue";
import FloatingConfirmationModal from "../components/FloatingConfirmationModal.vue";
import { auth } from "../firebase/config";
import { getUserAccounts } from "../firebase/accountService";
import { createPayment } from "../firebase/paymentService";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { HamburgerMenu, PaymentButton, FloatingConfirmationModal },
  setup() {
    const accounts = ref<any[]>([]);
    const fromAccount = ref("");
    const iban = ref("");
    const reference = ref("");
    const showConfirm = ref(false);
    const router = useRouter();

    onMounted(async () => {
      if (!auth.currentUser) return router.push("/login");
      accounts.value = await getUserAccounts(auth.currentUser.uid);
    });

    const confirmPayment = async () => {
      await createPayment(fromAccount.value, iban.value, 1, reference.value); // simuloidaan amount=1
      showConfirm.value = false;
      alert("Payment executed!");
    };

    const submitPayment = () => showConfirm.value = true;

    return { accounts, fromAccount, iban, reference, showConfirm, confirmPayment, submitPayment };
  },
});
</script>    const iban = ref("");
    const fromAccount = ref("");
    const reference = ref("");
    const showConfirm = ref(false);

    const confirmPayment = () => {
      console.log(`Payment sent from ${fromAccount.value} to ${iban.value} ref: ${reference.value}`);
      showConfirm.value = false;
    };

    const submitPayment = () => {
      showConfirm.value = true;
    };

    return { store, iban, fromAccount, reference, showConfirm, confirmPayment, submitPayment };
  }
});
</script>

<style scoped>
.payments-page { padding: 2rem; }
label, input, select { display: block; margin: 0.5rem 0; }
</style>
