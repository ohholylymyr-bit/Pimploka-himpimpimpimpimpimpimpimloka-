<template>
  <div class="cards-page">
    <HamburgerMenu />
    <h1>Your Cards</h1>
    <section>
      <h2>Create New Card</h2>
      <select v-model="cardType">
        <option value="debit">Debit</option>
        <option value="credit">Credit</option>
      </select>
      <input v-model="pin" type="password" placeholder="6-digit PIN" maxlength="6" />
      <button @click="createNewCard">Create Card</button>
    </section>
    <section>
      <h2>Existing Cards</h2>
      <ul>
        <li v-for="c in cards" :key="c.id">
          {{ c.type }} - {{ c.number }} - PIN: {{ c.pin }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import HamburgerMenu from "../components/HamburgerMenu.vue";
import { auth } from "../firebase/config";
import { createCard, getUserCards } from "../firebase/cardService";
import { useRouter } from "vue-router";

export default defineComponent({
  components: { HamburgerMenu },
  setup() {
    const router = useRouter();
    const cards = ref<any[]>([]);
    const cardType = ref("debit");
    const pin = ref("");

    const loadCards = async () => {
      if (!auth.currentUser) return router.push("/login");
      cards.value = await getUserCards(auth.currentUser.uid);
    };

    const createNewCard = async () => {
      if (!/^\d{6}$/.test(pin.value)) return alert("PIN must be 6 digits");
      if (!auth.currentUser) return;
      const newCard = await createCard(auth.currentUser.uid, cardType.value, pin.value);
      cards.value.push(newCard);
      pin.value = "";
    };

    onMounted(loadCards);

    return { cards, cardType, pin, createNewCard };
  },
});
</script>
