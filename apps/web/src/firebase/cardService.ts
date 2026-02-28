// apps/web/src/firebase/cardService.ts
import { db } from "./config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

export const createCard = async (userId: string, type: string, pin: string) => {
  const ref = doc(collection(db, "cards"));
  await setDoc(ref, {
    id: ref.id,
    userId,
    type,
    pin,
    number: Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(),
    nfcEnabled: true,
    createdAt: new Date()
  });
  return { id: ref.id, type, number: ref.id, pin };
};

export const getUserCards = async (userId: string) => {
  const snapshot = await getDocs(collection(db, "cards"));
  return snapshot.docs.map(doc => doc.data()).filter((c: any) => c.userId === userId);
};
