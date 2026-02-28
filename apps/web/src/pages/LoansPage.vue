<template>
  <div class="loans-page">
    <HamburgerMenu />
    <h1>Loans</h1>
    <section>
      <h2>Your Loans</h2>
      <ul>
        <li v-for="l in loans" :key="l.id">
          Amount: {{ l.amount }} € - Status: {{ l.status }}
          <button v-if="l.status==='ACTIVE'" @click="repayLoan(l.id)">Repay</button>
        </li>
      </ul>
    </section>
    <section>
      <h2>Take a Loan</h2>
      <input v-model.number="newLoan" type="number" placeholder="Max 20 €" />
      <button @click="takeLoan">Take Loan</button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HamburgerMenu from "../components/HamburgerMenu.vue";
import { auth } from "../firebase/config";
import { takeLoan, repayLoan as repayLoanService } from "../firebase/loanService";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const loans = ref<any[]>([]);
    const newLoan = ref(0);
    const router = useRouter();

    onMounted(async () => {
      if (!auth.currentUser) return router.push("/login");
      // Haetaan käyttäjän lainat Firestoresta (simuloidaan)
      loans.value = [];
    });

    const repayLoan = async (id: string) => {
      await repayLoanService(id);
      const loan = loans.value.find(l => l.id === id);
      if (loan) loan.status = "PAID";
    };

    const takeLoanFn = async () => {
      if (newLoan.value <= 0 || newLoan.value > 20) return alert("Max 20 €");
      if (!auth.currentUser) return;
      const loan = await takeLoan(auth.currentUser.uid, newLoan.value);
      loans.value.push(loan);
      newLoan.value = 0;
    };

    return { loans, newLoan, repayLoan, takeLoan: takeLoanFn };
  },
});
</script>
    const takeLoan = () => {
      if (newLoan.value > 20 || newLoan.value <= 0) return alert("Loan max 20 €");
      loans.value.push({ id: Date.now().toString(), amount: newLoan.value, status: "ACTIVE" });
      newLoan.value = 0;
    };

    return { loans, newLoan, repayLoan, takeLoan };
  }
});
</script>

<style scoped>
.loans-page { padding: 2rem; }
section { margin-bottom: 2rem; }
input { margin-right: 0.5rem; }
ul { list-style-type: none; padding: 0; }
li { margin: 0.5rem 0; }
button { margin-left: 0.5rem; }
</style>
