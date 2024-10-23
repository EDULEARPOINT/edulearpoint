"use client"
import React, { useEffect, useState } from 'react'
import { useAppContext } from "@/utils/GlobalContext"
import UserCard from '../_components/UserCard';


const UpdateProfilePic = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(null);
    const { updateProfilePicture, UserDetails, fetchUserDetails, user } = useAppContext()
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({});




    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    };
    useEffect(() => {
        if (user && user.uid) {
            fetchUserDetails(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (UserDetails) {

            setFormData(UserDetails);
            setIsLoading(false);
        }
    }, [UserDetails]);



    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        try {
            await updateProfilePicture(file);
            setFile(null);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploading(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;


    return (
        <div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Update Profile Picture</h2>
                <UserCard />
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mb-2"
                />
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className={`px-4 py-2 rounded ${file && !uploading
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    )
}

export default UpdateProfilePic