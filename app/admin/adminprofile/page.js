"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/utils/GlobalContext';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProfile = () => {
    const { user, updateAdminProfile, updateAdminProfilePicture, fetchAdminProfile } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [adminDetails, setAdminDetails] = useState(null);
    const [editedDetails, setEditedDetails] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const data = await fetchAdminProfile();
                    setAdminDetails(data);
                    setEditedDetails(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching admin profile:', error);
                    toast.error('Failed to fetch admin profile');
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, fetchAdminProfile]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedDetails({...adminDetails});
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedDetails({...adminDetails});
        setProfileImage(null);
    };

    const handleChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAdminProfile(editedDetails);
            if (profileImage) {
                const newImageUrl = await updateAdminProfilePicture(profileImage);
                setEditedDetails((prev) => ({ ...prev, profilePictureUrl: newImageUrl }));
            }
            setAdminDetails(editedDetails);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!adminDetails) {
        return <div className="text-center py-10">No profile data available</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <div className="h-48 w-full md:w-48 relative">
                            <Image
                                src={adminDetails.profilePictureUrl || '/default-avatar.jpg'}
                                alt="Admin Profile"
                                layout="fill"
                                objectFit="contain"
                                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                            {isEditing && (
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm p-1"
                                />
                            )}
                        </div>
                    </div>
                    <div className="p-8 w-full">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            Admin Profile
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={isEditing ? editedDetails.name || '' : adminDetails.name || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={isEditing ? editedDetails.email || '' : adminDetails.email || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={isEditing ? editedDetails.phone_number || '' : adminDetails.phone_number || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex space-x-4">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        onClick={handleEdit}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;