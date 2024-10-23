"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/utils/GlobalContext";

export default function ReferralRedirect({ params }) {
  const router = useRouter();
  const { user } = useAppContext();
  const { referralId } = params || {};

  useEffect(() => {
    console.log('ReferralRedirect loaded');
    console.log('Referral ID:', referralId);
    console.log('User:', user);

    if (user) {
      console.log('User is authenticated, redirecting to dashboard');
      router.replace('/dashboard');
    } else if (referralId) {
      console.log('User is not authenticated, redirecting to registration with referral');
      router.replace(`/registration?ref=${referralId}`);
    } else {
      console.log('No referral ID found, redirecting to home');
      router.replace('/');
    }
  }, [user, referralId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-2xl font-bold">Redirecting...</div>
    </div>
  );
}
