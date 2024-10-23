"use client"
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/utils/GlobalContext';
import KYCModal from '../_components/KYCModal';
import KYCCard from '../_components/KYCCard';


const AdminKYCPage = () => {
  const { fetchAllUsersWithKYC } = useAppContext();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await fetchAllUsersWithKYC();
      setUsers(allUsers);
    };
    loadUsers();
  }, [fetchAllUsersWithKYC]);

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-4">User KYC Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <KYCCard key={user.id} user={user} onClick={() => handleCardClick(user)} />
        ))}
      </div>
      <KYCModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
};

export default AdminKYCPage;