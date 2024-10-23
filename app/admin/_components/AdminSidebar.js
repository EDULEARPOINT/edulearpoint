"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { Auth } from '@/utils/firebase_config';

const AdminSidebar = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [isSectionOpen, setIsSectionOpen] = useState({
    profile: false,
    affiliates: false,
  });
  const logOut = async () => {
    await signOut(Auth);
    router.push("/");
  };

  const pathname = usePathname();

  const toggleSection = (section) => {
    setIsSectionOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const isActive = (path) => pathname === path;

  return (
    <aside
      className={`fixed mt-[98px] z-[100] top-0 right-0 w-64 bg-white h-[100vh] px-5 shadow-md transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:relative md:translate-x-0`}
    >
      <ul className="space-y-3 pl-5 mt-10">
        <li className={`p-4 text-gray-600 font-semibold border-b border-gray-200 ${isActive('/admin/adminprofile') || isActive('/admin/updateadminprofilepic') ? '' : ''}`}>
          <button
            onClick={() => toggleSection('profile')}
            className="w-full text-left"
          >
            Admin Profile
            <span className="float-right">
              {isSectionOpen.profile ? '▲' : '▼'}
            </span>
          </button>
          {isSectionOpen.profile && (
            <ul className="pl-4 space-y-3 mt-5">
              <li className={isActive('/admin/adminprofile') ? 'bg-black text-white p-2 rounded-lg ' : ''}>
                <Link href="/admin/adminprofile">View Admin Profile</Link>
              </li>
              {/* <li className={isActive('/admin/updateadminprofilepic') ? 'bg-black text-white p-2 rounded-lg ' : ' '}>
                <Link href="/admin/updateadminprofilepic">Update Admin Profile Photo</Link>
              </li> */}
            </ul>
          )}
        </li>
        <li className={`p-4 text-gray-600 rounded-lg font-semibold border-b border-gray-200 ${isActive('/admin/manage-admin') ? 'bg-black text-white font-semibold' : ''}`}>
          <Link href="/admin/manage-admin">Manage Admins</Link>
        </li>
        <li className={`p-4 text-gray-600 font-semibold border-b rounded-lg  border-gray-200 ${isActive('/admin/allusers') || isActive('/admin/updateusers') ? 'font-semibold' : ''}`}>
          <button
            onClick={() => toggleSection('affiliates')}
            className="w-full text-left"
          >
            Manage Users
            <span className="float-right">
              {isSectionOpen.affiliates ? '▲' : '▼'}
            </span>
          </button>
          {isSectionOpen.affiliates && (
            <ul className="pl-4 space-y-3 mt-5">
              <li className={isActive('/admin/allusers') ? 'bg-black text-white p-2 rounded-lg ' : ' '}>
                <Link href="/admin/allusers">Show All Users</Link>
              </li>
              <li className={isActive('/admin/updateusers') ? 'bg-black text-white  p-2 rounded-lg' : ' '}>
                <Link href="/admin/updateusers">Edit User Details</Link>
              </li>
            </ul>
          )}
        </li>
        {/* <li className={`p-4 text-gray-600 rounded-lg  font-semibold border-b border-gray-200 ${isActive('/admin/adminkyc') ? 'bg-black text-white font-semibold' : ''}`}>
          <Link href="/admin/adminkyc">Update KYC's</Link>
        </li> */}
        <li className={`p-4 text-gray-600 font-semibold border-b rounded-lg  border-gray-200 ${isActive('/admin/admincourses') ? 'bg-black text-white font-semibold' : ''}`}>
          <Link href="/admin/admincourses">Manage Courses</Link>
        </li>
      </ul>
      <button onClick={() => { logOut()}} className='w-[85%] bg-black text-white rounded-lg py-2 mt-20 float-end '>
        Logout
      </button>
      <button className="absolute top-4 right-4 text-black md:hidden" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </aside>
  );
};

export default AdminSidebar;