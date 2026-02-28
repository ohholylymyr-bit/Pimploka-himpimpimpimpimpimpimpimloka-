// apps/web/src/firebase/supportService.ts
import { db } from "./config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

export const sendSupportMessage = async (userId: string, message: string) => {
  const ref = doc(collection(db, "supportMessages"));
  await setDoc(ref, {
    id: ref.id,
    userId,
    message,
    status: "PENDING",
    createdAt: new Date()
  });
  return { id: ref.id, status: "PENDING" };
};

export const getSupportMessages = async () => {
  const snapshot = await getDocs(collection(db, "supportMessages"));
  return snapshot.docs.map(doc => doc.data());
};
