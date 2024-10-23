"use client"
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/utils/GlobalContext';

const AdminCoursePage = () => {
  const { fetchAllEnquiries } = useAppContext();
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        const data = await fetchAllEnquiries();
        setEnquiries(data);
      } catch (error) {
        console.error('Error loading enquiries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEnquiries();
  }, [fetchAllEnquiries]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-2 lg:px-10 mdpx-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Course Enquiries</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Course</th>
              <th scope="col" className="px-6 py-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {enquiry.name}
                </td>
                <td className="px-6 py-4">{enquiry.email}</td>
                <td className="px-6 py-4">{enquiry.phone}</td>
                <td className="px-6 py-4">{enquiry.courseName}</td>
                <td className="px-6 py-4">{enquiry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCoursePage;
