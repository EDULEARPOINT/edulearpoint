'use client';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/utils/GlobalContext';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'flowbite/dist/flowbite.css';

const AdminUpdateUser = () => {
    const { fetchAllUsers, updateUserDetailsByAdmin, deleteUser } = useAppContext();
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await fetchAllUsers();
            setUsers(allUsers);
        };

        fetchUsers();
    }, [fetchAllUsers]);

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteUser(userId);
            setUsers(users.filter(user => user.uid !== userId));
            toast.success('User deleted successfully!');
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await updateUserDetailsByAdmin(updatedUser.userId, updatedUser);
            setEditingUser(null);
            toast.success('User updated successfully!');
            // Optionally, refresh the users list
            const allUsers = await fetchAllUsers();
            setUsers(allUsers);
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('Failed to update user.');
        }
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
        toast.info('Editing cancelled');
    };

    return (
        <div className="md:px-4 px-2 pb-20 lg:px-8 w-full overflow-x-auto">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
            <div className="bg-white shadow w-full max-w-full overflow-hidden">
                <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-3xl font-semibold text-black">Manage Users</h2>
                    <p className="mt-1 text-sm text-black">Edit or delete user details.</p>
                </div>
                <div className="w-full max-w-full overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">S.No</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">UID</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Phone</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                            {users.map((user, index) => (
                                <tr key={user.uid}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{index + 1}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.userId}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.phone_number}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2">
                                            <FaPen />
                                        </button>
                                        <button onClick={() => handleDelete(user.uid)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onCancel={handleCancelEdit}
                    onUpdate={handleUpdateUser}
                />
            )}
        </div>
    );
};

const EditUserModal = ({ user, onCancel, onUpdate }) => {
    const [editedUser, setEditedUser] = useState({
        ...user,
        package: user.package || '',
        rewardIncome: user.rewardIncome || '',
        turnOverIncome: user.turnOverIncome || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(editedUser);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="relative bg-white p-5 border w-full max-w-lg shadow-lg rounded-md">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit User</h3>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={editedUser.name} onChange={handleChange} className="mb-2 w-full p-2 border rounded" placeholder="Name" />
                    <input type="text" name="uid" value={editedUser.userId} readOnly className="mb-2 w-full p-2 border rounded bg-gray-100" placeholder="UID" />
                    <input type="text" name="phone_number" value={editedUser.phone_number} onChange={handleChange} className="mb-2 w-full p-2 border rounded" placeholder="Phone Number" />
                    <input type="email" name="email" value={editedUser.email} onChange={handleChange} className="mb-2 w-full p-2 border rounded" placeholder="Email" />
                    <input type="text" name="package" value={editedUser.package} onChange={handleChange} className="mb-2 w-full p-2 border rounded" placeholder="Package" />
                    <input type="text" name="rewardIncome" value={editedUser.rewardIncome} onChange={handleChange} className="mb-2 w-full p-2 border rounded" placeholder="Reward Income" />
                    <input type="text" name="turnOverIncome" value={editedUser.turnOverIncome} onChange={handleChange} className="mb-2 w-full p-2 border rounded" placeholder="Turnover Income" />
                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">Update</button>
                        <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUpdateUser;
