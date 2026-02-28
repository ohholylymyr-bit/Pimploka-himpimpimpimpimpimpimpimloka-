// apps/web/src/firebase/adminService.ts
import { db } from "./config";
import { collection, doc, getDocs, updateDoc, setDoc } from "firebase/firestore";

export const addFundsToAllAccounts = async (amount: number) => {
  const snapshot = await getDocs(collection(db, "accounts"));
  for (const docSnap of snapshot.docs) {
    await updateDoc(doc(db, "accounts", docSnap.id), { balance: docSnap.data().balance + amount });
  }
};

export const getAllAccounts = async () => {
  const snapshot = await getDocs(collection(db, "accounts"));
  return snapshot.docs.map(doc => doc.data());
};

export const upgradeToCompanyAccount = async (userId: string) => {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, { type: "company" });
};

export const getAllSupportRequests = async () => {
  const snapshot = await getDocs(collection(db, "supportMessages"));
  return snapshot.docs.map(doc => doc.data());
};
