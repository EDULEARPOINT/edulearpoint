"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase_config';
import { toast } from 'react-toastify';
import { useAppContext } from '@/utils/GlobalContext';

const PaymentCallback = () => {
  const router = useRouter();
  const { signup } = useAppContext();

  useEffect(() => {
    const handlePaymentCallback = async () => {
      if (!router.isReady) return;

      const { status, paymentId } = router.query;

      if (status === 'success') {
        try {
          // Retrieve registration data from session storage
          const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));

          if (!registrationData) {
            throw new Error('Registration data not found');
          }

          // Use the signup function from GlobalContext
          const { userId } = await signup({
            sponsor_id: registrationData.sponsor_id,
            name: registrationData.name,
            email: registrationData.email,
            phone_number: registrationData.phone_number,
            password: registrationData.password,
            selectedPackage: registrationData.selectedPackage,
            referrerId: registrationData.referrerId,
            referrerName: registrationData.referrerName,
            referrerEmail: registrationData.referrerEmail
          });

          // Update the payment status
          await setDoc(doc(db, 'payments', paymentId), {
            userId: userId,
            package: registrationData.selectedPackage,
            status: 'success',
            createdAt: new Date(),
          });

          // Clear registration data from session storage
          sessionStorage.removeItem('registrationData');

          toast.success('Registration successful!');
          router.push('/dashboard');
        } catch (error) {
          console.error('Error during registration:', error);
          toast.error('Registration failed. Please try again.');
          router.push('/register');
        }
      } else {
        toast.error('Payment failed. Please try again.');
        router.push('/register');
      }
    };

    handlePaymentCallback();
  }, [router.isReady, router.query, router, signup]);

  return <div>Processing payment...</div>;
};

export default PaymentCallback;