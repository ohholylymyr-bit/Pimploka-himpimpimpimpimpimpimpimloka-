// apps/web/src/firebase/loanService.ts
import { db } from "./config";
import { collection, doc, setDoc, updateDoc, increment } from "firebase/firestore";

export const takeLoan = async (userId: string, amount: number) => {
  const ref = doc(collection(db, "loans"));
  await setDoc(ref, { id: ref.id, userId, amount, status: "ACTIVE", createdAt: new Date() });

  // Lisätään lainan määrä käyttäjän saldoon
  const q = collection(db, "accounts");
  const userAccountRef = doc(db, "accounts", userId); // oletetaan ensimmäinen tili
  await updateDoc(userAccountRef, { balance: increment(amount) });

  return { id: ref.id, amount, status: "ACTIVE" };
};

export const repayLoan = async (loanId: string) => {
  const ref = doc(db, "loans", loanId);
  await updateDoc(ref, { status: "PAID" });
};
