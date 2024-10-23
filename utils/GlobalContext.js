"use client"
import { arrayRemove, arrayUnion, collection, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth, db, storage } from './firebase_config';
import { AuthErrorCodes, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';




const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [UserDetails, setUserDetails] = useState({})
    const [teamMembers, setTeamMembers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter()



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const userRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.isAdmin) {
                            // Instead of setting user details here, just set a flag
                            setIsAdmin(true);
                        } else {
                            toast.error('User is not an admin');
                        }
                    } else {
                        toast.error('User document not found');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Failed to fetch user data');
                }
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // const fetchUserDetails = async (uid) => {
    //     if (!uid) {
    //         console.error('Invalid UID provided');
    //         return;
    //     }

    //     // console.log('Fetching user details for UID:', uid); // Add this line

    //     try {
    //         if (typeof uid !== 'string') {
    //             throw new Error(Invalid UID type: ${typeof uid});
    //         }

    //         const userDocRef = doc(db, "users", uid);
    //         // console.log('User document reference:', userDocRef); // Add this line

    //         const userDocSnap = await getDoc(userDocRef);

    //         if (userDocSnap.exists()) {
    //             const userData = userDocSnap.data();
    //             setUserDetails(userData);
    //             // console.log('User data fetched:', userData);
    //         } else {
    //             console.log("No such user document!");
    //             setUserDetails(null);
    //         }
    //     } catch (error) {
    //         console.error("Error getting user document: ", error);
    //         console.error("Error stack: ", error.stack); // Add this line
    //         setUserDetails(null);
    //     }
    // };
    const fetchUserDetails = async (uid) => {
        if (!uid) {
            console.error('Invalid UID provided');
            return;
        }

        try {
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                setUserDetails(userData);
                setIsAdmin(userData.isAdmin === true);
            } else {
                console.log('No such user document!');
                setUserDetails(null);
                setIsAdmin(false);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            setUserDetails(null);
            setIsAdmin(false);
        }
    };

    //sign up / create the user
    //(multiple referral links)
    // const signup = async ({ sponsor_id, name, email, phone_number, password, selectedPackage }) => {
    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
    //         const user = userCredential.user;

    //         const newUserData = {
    //             userId: user.uid,
    //             sponsor_id,
    //             name,
    //             email,
    //             phone_number,
    //             package: selectedPackage,
    //             createdAt: new Date(),
    //             directTeamMembers: [],
    //             passiveTeamMembers: {
    //                 level2: [],
    //                 level3: [],
    //                 level4: [],
    //                 level5: []
    //             },
    //             referredBy: null,
    //             totalEarnings: 0,
    //             referAmount: 0,
    //             directEarnings: 0,
    //             passiveEarnings: 0
    //         };

    //         await setDoc(doc(db, 'users', user.uid), newUserData);

    //         if (sponsor_id) {
    //             console.log('Calling updateReferralChain with:', newUserData, sponsor_id);
    //             await updateReferralChain(newUserData, sponsor_id);

    //             const referralChain = await getReferralChain(newUserData);
    //             if (referralChain.length > 0) {
    //                 await updateCommissions(referralChain);
    //             }
    //         }

    //         const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    //         await setDoc(doc(db, 'payments', paymentId), {
    //             userId: user.uid,
    //             package: selectedPackage,
    //             status: 'pending',
    //             createdAt: new Date(),
    //         });

    //         setUser(user);
    //         setUserDetails(newUserData);

    //         return { paymentId, userId: user.uid };
    //     } catch (error) {
    //         console.error('Error registering user: ', error);
    //         throw new Error('Error registering user: ' + error.message);
    //     }
    // };

    //(at time of single link)
    const signup = async ({ sponsor_id, name, email, phone_number, password, selectedPackage, referrerId, referrerName, referrerEmail }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
            const user = userCredential.user;

            const newUserData = {
                userId: user.uid,
                sponsor_id,
                name,
                email,
                phone_number,
                package: selectedPackage,
                createdAt: new Date(),
                directTeamMembers: [],
                passiveTeamMembers: {
                    level1: [],
                    level2: [],
                    level3: [],
                    level4: [],
                    level5: []
                },
                referredBy: referrerId ? {
                    userId: referrerId,
                    name: referrerName,
                    email: referrerEmail,
                    level: 1
                } : null,
                totalEarnings: 0,
                referAmount: 0,
                directEarnings: 0,
                passiveEarnings: 0,
                turnOverIncome: 0,
                rewardIncome: 0,
                isAdmin: false,
                initialCommissionCalculated: false,
            };

            await setDoc(doc(db, 'users', user.uid), newUserData);

            if (referrerId) {
                // Update referrer's direct team members
                const referrerRef = doc(db, 'users', referrerId);
                await updateDoc(referrerRef, {
                    directTeamMembers: arrayUnion(user.uid)
                });

                // Update passive team members up the chain
                let currentReferrerId = referrerId;
                let currentLevel = 0;

                while (currentReferrerId && currentLevel < 5) {
                    const upperReferrerRef = doc(db, 'users', currentReferrerId);
                    const upperReferrerDoc = await getDoc(upperReferrerRef);

                    if (upperReferrerDoc.exists()) {
                        const upperReferrerData = upperReferrerDoc.data();

                        if (currentLevel > 0) { // This is a passive member (level 1 and above)
                            await updateDoc(upperReferrerRef, {
                                [`passiveTeamMembers.level${currentLevel}`]: arrayUnion(user.uid)
                            });
                        }

                        currentLevel++;
                        currentReferrerId = upperReferrerData.referredBy ? upperReferrerData.referredBy.userId : null;
                    } else {
                        break;
                    }
                }
            }

            // Get the referral chain after the user registration
            const referralChain = await getReferralChain(user.uid);

            // Update the commissions based on the referral chain
            await updateCommissions(referralChain, user.uid);

            setUser(user);
            setUserDetails(newUserData);

            // Set a flag in localStorage to indicate the user has just registered
            localStorage.setItem('justRegistered', 'true');

            return { userId: user.uid };
        } catch (error) {
            console.error('Error registering user: ', error);
            throw new Error('Error registering user: ' + error.message);
        }
    };


    //updating commisiion
    const updateCommissions = async (referralChain, newUserId) => {
        if (!referralChain || referralChain.length === 0) {
            console.log('No referral chain to update commissions');
            return;
        }

        const newUserRef = doc(db, 'users', newUserId);
        const newUserDoc = await getDoc(newUserRef);

        if (!newUserDoc.exists() || newUserDoc.data().initialCommissionCalculated) {
            console.log('Commission already calculated for this user');
            return;
        }

        const commissionStructure = {
            starter: { referAmount: 90, levels: [0, 0, 0, 0, 0] },
            bronze: { referAmount: 250, levels: [50, 40, 20, 10, 5] },
            silver: { referAmount: 500, levels: [100, 80, 40, 20, 10] },
            gold: { referAmount: 1200, levels: [120, 80, 40, 20, 10] },
            platinum: { referAmount: 2600, levels: [150, 90, 40, 20, 10] }
        };

        try {
            for (let i = 0; i < referralChain.length; i++) {
                const referrer = referralChain[i];
                const referrerRef = doc(db, 'users', referrer.userId);
                const referrerDoc = await getDoc(referrerRef);

                if (referrerDoc.exists()) {
                    const referrerData = referrerDoc.data();
                    const packageData = commissionStructure[referrer.package] || commissionStructure.bronze;

                    let commission = 0;
                    let updatedData = {};

                    if (i === 0) { // Direct referrer
                        commission = packageData.referAmount;
                        updatedData = {
                            totalEarnings: (referrerData.totalEarnings || 0) + commission,
                            referAmount: (referrerData.referAmount || 0) + commission,
                            directEarnings: (referrerData.directEarnings || 0) + commission
                        };
                    } else { // Passive referrer
                        commission = packageData.levels[i - 1] || 0;
                        updatedData = {
                            totalEarnings: (referrerData.totalEarnings || 0) + commission,
                            passiveEarnings: (referrerData.passiveEarnings || 0) + commission
                        };
                    }

                    await updateDoc(referrerRef, updatedData);
                }
            }

            // Mark the commission as calculated for the new user
            await updateDoc(newUserRef, { initialCommissionCalculated: true });

            console.log('Commission update completed successfully');
        } catch (error) {
            console.error('Error updating commissions data:', error);
            throw error;
        }
    };


    //fucntion to update both user reefrral db at reg time
    //(not in use beacause i updated single referal link and integrate it to the signup function)
    // const updateReferralChain = async () => {
    //     console.log('Starting updateReferralChain function');
    //     try {
    //         const currentUser = UserDetails;
    //         console.log('Current User:', currentUser);

    //         if (!currentUser || !currentUser.sponsor_id) {
    //             console.error('Missing current user data or sponsor_id');
    //             return false;
    //         }

    //         const sponsor_id = currentUser.sponsor_id;
    //         console.log('Sponsor ID:', sponsor_id);

    //         const sponsorQuery = query(collection(db, 'users'), where('referralLinks', 'array-contains', sponsor_id));
    //         const sponsorDocs = await getDocs(sponsorQuery);
    //         console.log('Sponsor query completed. Number of docs:', sponsorDocs.size);

    //         if (sponsorDocs.empty) {
    //             console.error('No sponsor found with the given referral link:', sponsor_id);
    //             return false;
    //         }

    //         const sponsorDoc = sponsorDocs.docs[0];
    //         const sponsorId = sponsorDoc.id;
    //         let sponsorData = sponsorDoc.data();
    //         console.log('Sponsor found. Sponsor data:', sponsorData);

    //         // Update the current user's referredBy information
    //         const currentUserRef = doc(db, 'users', currentUser.userId);
    //         const currentUserDoc = await getDoc(currentUserRef);
    //         if (currentUserDoc.exists()) {
    //             await updateDoc(currentUserRef, {
    //                 referredBy: {
    //                     userId: sponsorId,
    //                     name: sponsorData.name,
    //                     email: sponsorData.email,
    //                     level: 1
    //                 }
    //             });
    //             console.log('Current user document updated with referral information');
    //         } else {
    //             console.error('Current user document not found');
    //             return false;
    //         }

    //         // Update sponsor's direct team members
    //         const sponsorRef = doc(db, 'users', sponsorId);
    //         await updateDoc(sponsorRef, {
    //             directTeamMembers: arrayUnion(currentUser.userId)
    //         });
    //         console.log('Sponsor document updated with new team member');

    //         // Update passive team members up the chain
    //         let currentSponsorId = sponsorId;
    //         let currentLevel = 1;

    //         while (currentLevel < 5 && sponsorData.referredBy) {
    //             currentLevel++;
    //             currentSponsorId = sponsorData.referredBy.userId;

    //             if (!currentSponsorId) {
    //                 console.error('Invalid currentSponsorId at level:', currentLevel);
    //                 break;
    //             }

    //             const upperSponsorRef = doc(db, 'users', currentSponsorId);
    //             const upperSponsorDoc = await getDoc(upperSponsorRef);
    //             if (upperSponsorDoc.exists()) {
    //                 await updateDoc(upperSponsorRef, {
    //                     [`passiveTeamMembers.level${currentLevel}`]: arrayUnion(currentUser.userId)
    //                 });
    //                 console.log(`Updated passive team members for level ${currentLevel}`);

    //                 sponsorData = upperSponsorDoc.data();
    //             } else {
    //                 console.error('Sponsor document not found for ID:', currentSponsorId);
    //                 break;
    //             }
    //         }

    //         console.log('Referral chain update completed successfully');
    //         return true;
    //     } catch (error) {
    //         console.error('Error in updateReferralChain:', error);
    //         throw error;
    //     }
    // };
    // (also not in use currently)
    // const updateReferralChainAndCommissions = async () => {
    //     console.log(UserDetails);
    //     try {
    //         if (!UserDetails || !UserDetails.userId) {
    //             console.error('Invalid user data provided');
    //             return;
    //         }

    //         const userId = UserDetails.userId;
    //         const selectedPackage = UserDetails.package;

    //         if (!selectedPackage) {
    //             console.error('No package found for the user');
    //             return;
    //         }

    //         console.log('Updating referral chain and commissions for user:', userId, 'with package:', selectedPackage);

    //         // First, update the referral chain
    //         const referralChainUpdated = await updateReferralChain();
    //         console.log('Referral chain update result:', referralChainUpdated);

    //         if (referralChainUpdated) {
    //             // If referral chain was updated successfully, fetch the updated chain
    //             const referralChain = await getReferralChain();
    //             console.log('Updated referral chain:', referralChain);

    //             if (referralChain.length > 0) {
    //                 // Now update commissions based on the updated referral chain
    //                 await updateCommissions(referralChain);
    //                 console.log('Commissions updated successfully');
    //             } else {
    //                 console.log('No referral chain found, no commissions to update');
    //             }
    //         } else {
    //             console.log('Referral chain update failed or not necessary, skipping commission update');
    //         }

    //         console.log('Referral chain and commissions update process completed');
    //     } catch (error) {
    //         console.error('Error updating referral chain and commissions:', error);
    //         throw error;
    //     }
    // };


    //fetching referral user data
    const getReferralChain = async (userId) => {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            console.error('User document not found');
            return [];
        }

        const userData = userDoc.data();
        const chain = [];
        let currentUser = userData;

        for (let i = 0; i < 5; i++) {
            if (!currentUser.referredBy || !currentUser.referredBy.userId) {
                break;
            }

            const userRef = doc(db, 'users', currentUser.referredBy.userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                chain.push({
                    userId: userData.userId,
                    name: userData.name,
                    email: userData.email,
                    level: i + 1,
                    package: userData.package
                });

                currentUser = userData;
            } else {
                console.log(`User document not found for ID: ${currentUser.referredBy.userId}`);
                break;
            }
        }

        return chain;
    };


    const updateReferralChainAndCommissions = async (userId) => {
        try {
            if (!userId) {
                console.error('Invalid user ID provided');
                return;
            }

            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                console.error('User document not found');
                return;
            }

            const userData = userDoc.data();

            if (userData.initialCommissionCalculated) {
                console.log('Commissions already calculated for this user');
                return;
            }

            console.log('Starting referral chain and commission update for user:', userId);

            // Get the referral chain
            const referralChain = await getReferralChain(userId);
            console.log('Obtained referral chain:', referralChain);

            if (referralChain.length > 0) {
                // Update commissions based on the referral chain
                await updateCommissions(referralChain, userId);
                console.log('Commissions updated successfully');

                // Mark the commission as calculated for the user
                await updateDoc(userRef, { initialCommissionCalculated: true });
            } else {
                console.log('No referral chain found, no commissions to update');
            }

            console.log('Referral chain and commissions update process completed');
        } catch (error) {
            console.error('Error updating referral chain and commissions:', error);
            throw error;
        }
    };

    // login user  with email and password
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(Auth, email, password);
            const user = userCredential.user;
    
            // Fetch user data from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();
    
            if (userData) {
                setUserDetails(userData);
                
                if (userData.isAdmin) {
                    // If user is admin, redirect to admin dashboard
                    router.push('/admin/allusers');
                } else {
                    // If regular user, redirect to user dashboard or home page
                    router.push('/dashboard');
                }
            } else {
                console.error('User document not found in Firestore');
                throw new Error('User data not found');
            }
    
            return user;
        } catch (error) {
          console.error('Error logging in: ', error);
          throw error;
        }
      };

    // logout function
    const logout = async () => {
        try {
            await signOut(Auth)
            setUser(null)
            toast.success("logged out");
        } catch (e) {
            console.log(e);
        }
    }

    //update user information in profile page
    const updateUserDetails = async (updatedDetails) => {
        if (!user || !user.uid) {
            console.error('No user is currently logged in');
            throw new Error('User not authenticated');
        }

        try {
            await updateDoc(doc(db, 'users', user.uid), updatedDetails);

            // Fetch the latest user details after update
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const newUserDetails = userDocSnap.data();
                setUserDetails(newUserDetails);
            } else {
                console.error('User document not found after update');
                throw new Error('User document not found');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            throw error;
        }
    };


    //function to update user profile phto
    const updateProfilePicture = async (file) => {
        if (!user) return;

        try {
            // Create a reference to the file in Firebase Storage
            const storageRef = ref(storage, `users/${user.uid}/profile_picture.jpg`);

            // Upload the file
            await uploadBytes(storageRef, file);

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Update Firestore with the new image URL
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                profilePictureUrl: downloadURL
            });

            // Update local state
            setUserDetails(prevDetails => ({
                ...prevDetails,
                profilePictureUrl: downloadURL
            }));

            console.log("Profile picture updated successfully");
        } catch (error) {
            console.error("Error updating profile picture:", error);
            throw error;
        }
    };


    //fucntions to generate and update user's pkg
    const getUserPackage = async () => {
        if (!user) return null;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        return userDoc.exists() ? userDoc.data().package : null;
    };
    const updateUserPackage = async (newPackage) => {
        if (!user) return;
        await updateDoc(doc(db, 'users', user.uid), { package: newPackage });
    };


    // Function to fetch team members details on team page
    const fetchTeamMembers = async (user, userDetails) => {
        if (!user || !userDetails) {
            console.log("No user logged in or no user details");
            return;
        }

        try {
            let allMembers = [];

            // Fetch direct team members
            if (userDetails.directTeamMembers) {
                const directMemberPromises = userDetails.directTeamMembers.map(async (memberId) => {
                    const memberDoc = await getDoc(doc(db, 'users', memberId));
                    if (memberDoc.exists()) {
                        return {
                            id: memberId,
                            ...memberDoc.data(),
                            memberType: 'Direct'
                        };
                    }
                    return null;
                });
                const directMembers = await Promise.all(directMemberPromises);
                allMembers = allMembers.concat(directMembers.filter(member => member !== null));
            }

            // Fetch passive team members
            if (userDetails.passiveTeamMembers) {
                for (let level = 1; level <= 5; level++) {
                    const levelMembers = userDetails.passiveTeamMembers[`level${level}`] || [];
                    const passiveMemberPromises = levelMembers.map(async (memberId) => {
                        const memberDoc = await getDoc(doc(db, 'users', memberId));
                        if (memberDoc.exists()) {
                            return {
                                id: memberId,
                                ...memberDoc.data(),
                                memberType: `Passive`
                            };
                        }
                        return null;
                    });
                    const passiveMembers = await Promise.all(passiveMemberPromises);
                    allMembers = allMembers.concat(passiveMembers.filter(member => member !== null));
                }
            }

            return allMembers;
        } catch (error) {
            console.error("Error fetching team members:", error);
            return [];
        }
    };

    // Function for admin to update team members data
    const updateTeamMember = async (updatedMember) => {
        if (!user) return;

        try {
            const memberDocRef = doc(db, 'users', updatedMember.id);
            await updateDoc(memberDocRef, {
                name: updatedMember.name,
                email: updatedMember.email,
                phone_number: updatedMember.phone_number,
                package: updatedMember.package,
                rewardIncome: updatedMember.rewardIncome,
                turnOverIncome: updatedMember.turnOverIncome
            });

            console.log("Team member updated successfully");
        } catch (error) {
            console.error("Error updating team member:", error);
            throw error;
        }
    };

    // Function to delete user data by admin
    const deleteTeamMember = async (memberId, memberType) => {
        if (!user) return;

        try {
            const userDocRef = doc(db, 'users', user.uid);
            if (memberType === 'Direct') {
                await updateDoc(userDocRef, {
                    directTeamMembers: arrayRemove(memberId)
                });
            } else if (memberType.startsWith('Passive')) {
                const level = memberType.split(' ')[2];
                await updateDoc(userDocRef, {
                    [`passiveTeamMembers.level${level}`]: arrayRemove(memberId)
                });
            }

            // Optionally, you might want to update or delete the team member's user document as well
            // This depends on your app's requirements
            // await deleteDoc(doc(db, 'users', memberId));

            console.log("Team member deleted successfully");
        } catch (error) {
            console.error("Error deleting team member:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (user && UserDetails) {
            fetchTeamMembers(user, UserDetails).then(members => {
                setTeamMembers(members);
            });
        }
    }, [user, UserDetails]);


    // funciton to upload user's kyc
    const uploadKYCData = async (formData) => {
        if (!Auth.currentUser) {
            throw new Error('User not authenticated')
        }

        const userId = Auth.currentUser.uid

        // Upload images to Firebase Storage
        const uploadImage = async (file) => {
            if (!file) return null
            const storageRef = ref(storage, `KYC/${userId}/${userId}_${file.name}`)
            await uploadBytes(storageRef, file)
            return getDownloadURL(storageRef)
        }

        const aadharUrl = await uploadImage(formData.aadharCard, 'aadhar_cards')
        const panUrl = await uploadImage(formData.panCard, 'pan_cards')

        // Save KYC data to Firestore
        const kycData = {
            aadharCardUrl: aadharUrl || formData.aadharCardUrl,
            panCardUrl: panUrl || formData.panCardUrl,
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            ifscCode: formData.ifscCode,
            upiId: formData.upiId,
            updatedAt: new Date()
        }

        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, { kyc: kycData })
    }

    const getUserKYCData = async () => {
        if (!Auth.currentUser) {
            console.log('Waiting for authentication...');
            // Wait for a short period to allow auth state to update
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!Auth.currentUser) {
                console.log('User still not authenticated after waiting');
                return null;
            }
        }

        try {
            const userId = Auth.currentUser.uid;
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                return userData.kyc || null;
            }

            return null;
        } catch (error) {
            console.error('Error fetching KYC data:', error);
            return null;
        }
    };



    //admin functions
    const fetchAllUsers = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection);

            // Filter out admin users and map the remaining user data
            return userSnapshot.docs
                .filter(doc => {
                    const userData = doc.data();
                    return userData.isAdmin !== true; // This will include users where isAdmin is false or not set
                })
                .map(doc => ({ ...doc.data(), id: doc.id }));
        } catch (error) {
            console.error('Error fetching non-admin users:', error);
            throw error;
        }
    };
    // Update user details
    const updateUserDetailsByAdmin = async (userId, updatedDetails) => {
        if (!Auth.currentUser) {
            console.error('No authenticated user');
            throw new Error('No authenticated user');
        }

        try {
            // Query the user document by userId
            const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
            const userSnapshot = await getDocs(userQuery);

            if (userSnapshot.empty) {
                console.error('User not found');
                throw new Error('User not found');
            }

            const userDoc = userSnapshot.docs[0];

            // Update the user document
            await updateDoc(userDoc.ref, updatedDetails);
            toast.success('User details updated successfully');
        } catch (error) {
            console.error('Error updating user details:', error);
            toast.error('Error updating user details');
            throw error;
        }
    };
    // Delete user
    const deleteUser = async (uid) => {
        if (!uid) {
            console.error('Invalid UID provided');
            throw new Error('Invalid UID provided');
        }

        try {
            await deleteDoc(doc(db, 'users', uid));
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user');
            throw error;
        }
    };


    // Check if user is admin
    const isUserAdmin = async (userId) => {
        const userDoc = await getDoc(doc(db, 'users', userId));
        return userDoc.exists() && userDoc.data().isAdmin === true;
    };

    // Fetch all admin users
    const fetchAllAdmins = async () => {
        const adminQuery = query(collection(db, 'users'), where('isAdmin', '==', true));
        const adminSnapshot = await getDocs(adminQuery);
        return adminSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    // Create new admin
    const createNewAdmin = async (adminData) => {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(Auth, adminData.email, adminData.password);
        const user = userCredential.user;

        // Add user to Firestore with isAdmin set to true
        await setDoc(doc(db, 'users', user.uid), {
            ...adminData,
            userId: user.uid,
            isAdmin: true,
            createdAt: new Date()
        });

        return user;
    };

    // Delete admin
    const deleteAdmin = async (adminId) => {
        await deleteDoc(doc(db, 'users', adminId));
        // Note: You may also want to delete the user from Firebase Authentication
    };


    const fetchAllEnquiries = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection);

            let allEnquiries = [];

            for (const doc of userSnapshot.docs) {
                const userData = doc.data();
                if (userData.studentEnquiryDetails && userData.studentEnquiryDetails.length > 0) {
                    allEnquiries = allEnquiries.concat(
                        userData.studentEnquiryDetails.map(enquiry => ({
                            ...enquiry,
                            userId: doc.id,
                            userEmail: userData.email
                        }))
                    );
                }
            }

            return allEnquiries;
        } catch (error) {
            console.error('Error fetching all enquiries:', error);
            throw error;
        }
    };

    const updateAdminProfile = async (updatedDetails) => {
        if (!user || !user.uid) {
            throw new Error('User not authenticated');
        }

        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, updatedDetails);

            // Don't update any state here
            // The AdminProfile component will fetch the updated data when needed

            toast.success('Admin profile updated successfully');
        } catch (error) {
            console.error('Error updating admin profile:', error);
            throw error;
        }
    };

    // Function to update admin profile picture
    const updateAdminProfilePicture = async (file) => {
        if (!user || !user.uid) {
            throw new Error('User not authenticated');
        }

        try {
            const storageRef = ref(storage, `admin/${user.uid}/profile_picture.jpg`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { profilePictureUrl: downloadURL });

            setUserDetails((prevDetails) => ({
                ...prevDetails,
                profilePictureUrl: downloadURL,
            }));

            console.log('Admin profile picture updated successfully');
            return downloadURL;
        } catch (error) {
            console.error('Error updating admin profile picture:', error);
            throw error;
        }
    };

    // Function to fetch admin profile
    const fetchAdminProfile = async () => {
        if (!user || !user.uid) {
            throw new Error('User not authenticated');
        }

        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists() || !userDoc.data().isAdmin) {
                throw new Error('User is not an admin');
            }

            return userDoc.data();
        } catch (error) {
            console.error('Error fetching admin profile:', error);
            throw error;
        }
    };
    const fetchAllUsersWithKYC = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection);
            return userSnapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .filter(user => user.kyc);
        } catch (error) {
            console.error('Error fetching users with KYC:', error);
            throw error;
        }
    };



    const exportedFunc = {
        user, signup, login, logout, UserDetails, fetchUserDetails, updateUserDetails, updateProfilePicture, updateUserPackage, getUserPackage, teamMembers, fetchTeamMembers, updateTeamMember, deleteTeamMember, uploadKYCData, getUserKYCData, updateCommissions, updateReferralChainAndCommissions, fetchAllUsers, updateUserDetailsByAdmin, deleteUser, fetchAllAdmins, createNewAdmin, isUserAdmin, deleteAdmin, fetchAllEnquiries, fetchAllUsersWithKYC, fetchAdminProfile, updateAdminProfilePicture, updateAdminProfile
    }

    return (
        <GlobalContext.Provider value={exportedFunc}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(GlobalContext);
};