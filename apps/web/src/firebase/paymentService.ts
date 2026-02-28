// apps/web/src/firebase/paymentService.ts
import { db } from "./config";
import { collection, doc, setDoc, updateDoc, increment } from "firebase/firestore";

export const createPayment = async (
  fromAccountId: string,
  toIban: string,
  amount: number,
  reference: string
) => {
  // Lisää maksutapahtuma Firestoreen
  const ref = doc(collection(db, "payments"));
  await setDoc(ref, { id: ref.id, fromAccountId, toIban, amount, reference, status: "PENDING", createdAt: new Date() });

  // Simuloidaan saldojen päivitys atomisesti (Firestore transaction olisi parempi)
  const fromRef = doc(db, "accounts", fromAccountId);
  await updateDoc(fromRef, { balance: increment(-amount) });

  return { id: ref.id, status: "PENDING" };
};
