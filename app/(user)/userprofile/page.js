"use client"
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/utils/GlobalContext';

const MyProfile = () => {
    const { UserDetails, updateUserDetails, fetchUserDetails, user } = useAppContext();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await updateUserDetails(formData);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    };

    if (isLoading) return <div>Loading...</div>;

  return (
    <div className="md:px-20 px-5 py-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Cancel' : 'Update Information'}
        </button>
      </div>
      
      
      <form onSubmit={handleSubmit}>
        {/* Sponsor Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Sponsor Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor Name</label>
              <input type="text" name="sponsorName" value={formData.sponsorName || ''} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SponsorId</label>
              <input type="text" name="sponsorMobile" value={formData.sponsor_id || ''} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
            </div>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" value={formData.name || ''} onChange={handleChange} readOnly={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} readOnly={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
              <input type="text" name="mobile" value={formData.phone_number || ''} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select name="gender" value={formData.gender || ''} onChange={handleChange} disabled={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} readOnly={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input type="text" name="country" value={formData.country || ''} onChange={handleChange} readOnly={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" name="state" value={formData.state || ''} onChange={handleChange} readOnly={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pin code</label>
              <input type='text' name="pincode" value={formData.pincode || ''} onChange={handleChange} readOnly={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`} rows="3"></input>
            </div>
          </div>
            <div className='w-full mt-3'>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea name="address" value={formData.address || ''} onChange={handleChange} readOnly={!isEditing} className={`w-full p-2 border rounded-md ${!isEditing && 'bg-gray-100'}`} rows="3"></textarea>
            </div>
        </div>
        
        {isEditing && (
          <div className="mt-6">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MyProfile;