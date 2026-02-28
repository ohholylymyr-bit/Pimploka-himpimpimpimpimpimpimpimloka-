// apps/web/src/firebase/profileService.ts
import { db, auth } from "./config";
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

export const updateUsername = async (userId: string, username: string) => {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, { username });
};

export const updatePin = async (newPin: string) => {
  // oletetaan että PIN tallennetaan Authin passwordina
  if (auth.currentUser) await updatePassword(auth.currentUser, newPin);
};
