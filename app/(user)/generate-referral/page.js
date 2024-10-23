"use client"

import { useAppContext } from "@/utils/GlobalContext";
import { db } from "@/utils/firebase_config";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export function generateReferralLink(name) {
  const randomString = Math.random().toString(36).substring(2, 12);
  const formattedName = name.replace(/\s+/g, '').toLowerCase(); 
  return `${formattedName}-${randomString}`;
}


async function getOrCreateReferralLink(userId, name) {
  if (!userId || typeof userId !== 'string') {
    console.error('Invalid userId:', userId);
    return null;
  }
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists() && userDoc.data().referralLink) {
    return userDoc.data().referralLink;
  } else {
    const newLink = generateReferralLink(name);
    await setDoc(userRef, { referralLink: newLink }, { merge: true });
    return newLink;
  }
}

export default function GenerateReferralLink() {
  const [copied, setCopied] = useState(false);
  const [isAdmin, setIsAdmin] = useState()
  const [referralLink, setReferralLink] = useState('');
  const { user, UserDetails, fetchUserDetails,updateReferralChainAndCommissions, updateCommissions } = useAppContext();

  useEffect(() => {
    if (user?.uid) {
      fetchUserDetails(user.uid);
    }
  }, [user, fetchUserDetails]);

  useEffect(() => {
    async function fetchReferralLink() {
      if (user?.uid && UserDetails?.name && !isAdmin) {
        try {
          const link = await getOrCreateReferralLink(user.uid, UserDetails.name);
          setReferralLink(`${window.location.origin}/referral/${link}`);
        } catch (error) {
          console.error("Error fetching/creating referral link:", error);
        }
      }
    }
    fetchReferralLink();
  }, [user, UserDetails, isAdmin]);

  const handleCopy = async () => {
    if (referralLink) {
      try {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  // const handleGenerateLink = async () => {
  //   if (user?.uid && UserDetails?.name) {
  //     try {
  //       const newLink = generateReferralLink(UserDetails.name);
  //       await saveReferralLink(user.uid, newLink);
  //       setReferralLink(`${window.location.origin}/referral/${newLink}`);
  //     } catch (error) {
  //       console.error("Error generating referral link:", error);
  //     }
  //   } else {
  //     console.error("User details not available");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // await updateCommissions();
    await updateReferralChainAndCommissions();
  };
  // const handleSubmit22 = async (event) => {
  //   event.preventDefault();
  //   await updateReferralChain();
  //   // await updateReferralChainAndCommissions();
  // };
  

  return (
    <div className="h-[100vh] flex flex-col bg-white">
      <h1 className="text-xs md:px-20 px-10 mt-5">(Apologize for any inconvenience caused. Due to testing mode, transactions are currently paused, and database updates must be done manually. We are working diligently to restore full functionality as soon as possible.) </h1>
      <div className=" p-8 ">
        <h1 className="text-2xl font-bold mb-4">Generate Referral Link</h1>
       
        {isAdmin ? (
          <p>Referral links are not available for admin users.</p>
        ) : referralLink ? (
          <div>
            <p className="mb-2">Your unique referral link:</p>
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        ) : (
          <p>Loading your referral link...</p>
        )}
      </div>
      {/* <div className="flex flex-col md:flex-row gap-2 md:px-10">
        <button className="bg-zinc-100 py-2 md:px-10" onClick={handleSubmit} >update referral and commissions</button>
        <button className="bg-zinc-100 py-2 md:px-10" onClick={handleSubmit22} >update referral </button>
      </div> */}
    </div>
  );
}