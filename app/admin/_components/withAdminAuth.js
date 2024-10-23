"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Auth, db } from '@/utils/firebase_config';
import { doc, getDoc } from 'firebase/firestore';

export function withAdminAuth(WrappedComponent) {
  return function WithAdminAuth(props) {
    const [user, loading] = useAuthState(Auth);
    const router = useRouter();

    useEffect(() => {
      const checkAdminStatus = async () => {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          console.log('Checking admin status');
          console.log('User:', user);
          console.log('User data:', userData);
          if (!userData || !userData.isAdmin) {
            router.push('/'); // Redirect non-admin users
          }
        }
      };

      if (!loading) {
        if (!user) {
          router.push('/login');
        } else {
          checkAdminStatus();
        }
      }
    }, [user, loading, router]);

    if (loading) return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };
}
