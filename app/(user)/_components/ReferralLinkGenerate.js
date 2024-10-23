import { db } from "@/utils/firebase_config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";


export function generateReferralLink(name) {
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${name.toLowerCase().replace(/\s+/g, '-')}-${randomString}`;
}

export async function saveReferralLink(userId, referralLink) {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      referralLinks: arrayUnion(referralLink)
    });
  } catch (error) {
    console.error("Error saving referral link: ", error);
    throw error;
  }
}