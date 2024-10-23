import React from 'react';

const KYCCard = ({ user, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={onClick}>
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-600">Aadhar: {user.kyc?.aadharCardUrl ? 'Uploaded' : 'Not uploaded'}</p>
      <p className="text-gray-600">PAN: {user.kyc?.panCardUrl ? 'Uploaded' : 'Not uploaded'}</p>
      <p className="text-gray-600">Bank Details: {user.kyc?.bankName ? 'Provided' : 'Not provided'}</p>
    </div>
  );
};

export default KYCCard;