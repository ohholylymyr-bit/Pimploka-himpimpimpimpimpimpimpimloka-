// apps/web/src/firebase/accountService.ts
import { db } from "./config";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

export const createAccount = async (userId: string, type: string, iban: string, balance = 0) => {
  const ref = doc(collection(db, "accounts"));
  await setDoc(ref, { id: ref.id, userId, type, iban, balance });
  return { id: ref.id, userId, type, iban, balance };
};

export const getUserAccounts = async (userId: string) => {
  const q = query(collection(db, "accounts"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
