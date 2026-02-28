// apps/web/src/store/index.ts
import { reactive } from "vue";

export const store = reactive({
  user: null as null | { id: string; username: string },
  accounts: [] as Array<{ id: string; iban: string; type: string; balance: number }>,
  token: "",
});

export default store;
