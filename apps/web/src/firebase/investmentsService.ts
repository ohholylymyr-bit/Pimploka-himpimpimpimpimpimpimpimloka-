// apps/web/src/firebase/investmentsService.ts
import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

export const getCryptoPrices = async () => {
  const snapshot = await getDocs(collection(db, "crypto"));
  return snapshot.docs.map(doc => doc.data());
};

export const getGlobalStocks = async () => {
  const snapshot = await getDocs(collection(db, "stocks"));
  return snapshot.docs.map(doc => doc.data());
};

export const getFinnishInvestments = async () => {
  const snapshot = await getDocs(collection(db, "finnishInvestments"));
  return snapshot.docs.map(doc => doc.data());
};
