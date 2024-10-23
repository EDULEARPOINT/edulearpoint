// "use client";

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { Auth, db } from '@/utils/firebase_config';
// import { doc, getDoc } from 'firebase/firestore';

// export function withUserAuth(WrappedComponent) {
//   return function WithUserAuth(props) {
//     const [user, loading] = useAuthState(Auth);
//     const router = useRouter();

//     useEffect(() => {
//       const checkUserRole = async () => {
//         if (user) {
//           const userDoc = await getDoc(doc(db, 'users', user.uid));
//           const userData = userDoc.data();
//           if (userData && userData.isAdmin) {
//             router.push('/admin/allusers'); // Redirect admin users to the admin dashboard
//           }
//         }
//       };

//       if (!loading) {
//         if (!user) {
//           router.push('/login');
//         } else {
//           checkUserRole();
//         }
//       }
//     }, [user, loading, router]);

//     if (loading) return <div>Loading...</div>;

//     return <WrappedComponent {...props} />;
//   };
// }
