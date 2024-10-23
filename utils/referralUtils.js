import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase_config";


// Function to add user to the referral chain
export const addUserToReferralChain = async (newUserId, referrerId) => {
  const newUserRef = doc(db, 'users', newUserId);
  const referrerRef = doc(db, 'users', referrerId);
  const referrerSnap = await getDoc(referrerRef);

  if (referrerSnap.exists()) {
    const referrerData = referrerSnap.data();

    // Update new user's referredBy field
    await updateDoc(newUserRef, { referredBy: referrerId });

    // Update referrer's team data
    await updateDoc(referrerRef, { 'team.level1': arrayUnion(newUserId) });

    // Update ancestors' team data up to level 5
    let ancestorId = referrerId;
    for (let level = 2; level <= 5; level++) {
      const ancestorRef = doc(db, 'users', ancestorId);
      const ancestorSnap = await getDoc(ancestorRef);

      if (ancestorSnap.exists()) {
        const ancestorData = ancestorSnap.data();
        const nextAncestorId = ancestorData.referredBy;

        if (nextAncestorId) {
          await updateDoc(ancestorRef, {
            [`team.level${level}`]: arrayUnion(newUserId)
          });
          ancestorId = nextAncestorId;
        } else {
          break;
        }
      }
    }
  }
};

// Function to distribute commissions
export const distributeCommissions = async (newUserId, referrerId) => {
  const levels = 5;
  const commissions = [10, 5, 3, 2, 1]; // Commission percentages for levels 1 to 5

  let ancestorId = referrerId;
  for (let level = 0; level < levels; level++) {
    const ancestorRef = doc(db, 'users', ancestorId);
    const ancestorSnap = await getDoc(ancestorRef);

    if (ancestorSnap.exists()) {
      const ancestorData = ancestorSnap.data();
      const commission = commissions[level];

      // Update ancestor's commission
      await updateDoc(ancestorRef, {
        commission: (ancestorData.commission || 0) + commission
      });

      ancestorId = ancestorData.referredBy;
      if (!ancestorId) break;
    }
  }
};
