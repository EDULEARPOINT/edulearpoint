import React from 'react';
import Image from 'next/image';

const KYCModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{user.name}&apos;s KYC Details</h2>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Aadhar Card</h3>
          {user.kyc?.aadharCardUrl ? (
            <div className="relative w-full h-64">
              <Image 
                src={user.kyc.aadharCardUrl} 
                alt="Aadhar Card" 
                layout="fill" 
                objectFit="contain"
              />
            </div>
          ) : (
            <p>Not uploaded</p>
          )}
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold">PAN Card</h3>
          {user.kyc?.panCardUrl ? (
            <div className="relative w-full h-64">
              <Image 
                src={user.kyc.panCardUrl} 
                alt="PAN Card" 
                layout="fill" 
                objectFit="contain"
              />
            </div>
          ) : (
            <p>Not uploaded</p>
          )}
        </div>
        
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Bank Details</h3>
          <p>Bank Name: {user.kyc?.bankName || 'Not provided'}</p>
          <p>Account Number: {user.kyc?.accountNumber || 'Not provided'}</p>
          <p>IFSC Code: {user.kyc?.ifscCode || 'Not provided'}</p>
          <p>UPI ID: {user.kyc?.upiId || 'Not provided'}</p>
        </div>
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default KYCModal;