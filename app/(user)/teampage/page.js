'use client';
import { useAppContext } from '@/utils/GlobalContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const TeamPage = () => {
  const { teamMembers, fetchTeamMembers, updateTeamMember, deleteTeamMember } = useAppContext();
  const [editingMember, setEditingMember] = useState(null);


  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleEdit = (member) => {
    setEditingMember({ ...member });
  };

  const handleDelete = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      await deleteTeamMember(memberId);
      fetchTeamMembers(); // Refresh the list
      toast.success('Team member deleted successfully!');
    }
  };

  const handleUpdateMember = async (updatedMember) => {
    try {
      await updateTeamMember(updatedMember);
      setEditingMember(null);
      fetchTeamMembers(); // Refresh the list
      toast.success('Team member updated successfully!');
    } catch (error) {
      toast.error('Failed to update team member.');
    }
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    toast.info('Editing cancelled');
  };
  // const hanldeClick = ()=>{
  //   fetchTeamMembers();
  // }

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-white  shadow w-full max-w-full overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-3xl font-semibold text-black ">Your Team</h2>
          <p className="mt-1 text-sm text-black">Browse a list of your team members, including their details and level information.</p>
        </div>
        <div className="w-full max-w-full overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">S.No</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Email</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Package</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Level</th>
                {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              {teamMembers.map((member, index) => (
                <tr key={member.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{index + 1}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{member.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{member.email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{member.package}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">{member.memberType}</td>
                  {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2">
                      <FaPen />
                    </button>
                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <FaTrash />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* {editingMember && (
        <EditMemberModal
          member={editingMember}
          onCancel={handleCancelEdit}
          onUpdate={handleUpdateMember}
        />
      )} */}
    </div>
  );
};

// const EditMemberModal = ({ member, onCancel, onUpdate }) => {
//   const [editedMember, setEditedMember] = useState({
//     ...member,
//     turnOverIncome: member.turnOverIncome || '',
//     rewardIncome: member.rewardIncome || ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedMember(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(editedMember);
//   };

  // return (
  //   <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
  //     <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
  //       <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Team Member</h3>
  //       <form onSubmit={handleSubmit}>
  //         <input
  //           type="text"
  //           name="name"
  //           value={editedMember.name}
  //           onChange={handleChange}
  //           className="mb-2 w-full p-2 border rounded"
  //           placeholder="Name"
  //         />
  //         <input
  //           type="email"
  //           name="email"
  //           value={editedMember.email}
  //           onChange={handleChange}
  //           className="mb-2 w-full p-2 border rounded"
  //           placeholder="Email"
  //         />
  //         <input
  //           type="text"
  //           name="phone_number"
  //           value={editedMember.phone_number}
  //           onChange={handleChange}
  //           className="mb-2 w-full p-2 border rounded"
  //           placeholder="Phone Number"
  //         />
  //         <input
  //           type="text"
  //           name="package"
  //           value={editedMember.package}
  //           onChange={handleChange}
  //           className="mb-2 w-full p-2 border rounded"
  //           placeholder="Package"
  //         />
  //         <input
  //           type="text"
  //           name="turnOverIncome"
  //           value={editedMember.turnOverIncome}
  //           onChange={handleChange}
  //           className="mb-2 w-full p-2 border rounded"
  //           placeholder="Turnover Income"
  //         />
  //         <input
  //           type="text"
  //           name="rewardIncome"
  //           value={editedMember.rewardIncome}
  //           onChange={handleChange}
  //           className="mb-2 w-full p-2 border rounded"
  //           placeholder="Reward Income"
  //         />
  //         <div className="mt-4">
  //           <button
  //             type="submit"
  //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
  //           >
  //             Update
  //           </button>
  //           <button
  //             onClick={onCancel}
  //             className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
  //           >
  //             Cancel
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
// };
export default TeamPage;