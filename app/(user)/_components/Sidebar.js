import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isAffilateOpen, setIsAffilateOpen] = useState(false);

    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleAffilate = () => setIsAffilateOpen(!isAffilateOpen);

    return (
        <aside>
            <div className="w-64 bg-white h-full shadow-md">
                <ul className="space-y-2 pl-7">
                   
                <li className="p-4 text-zinc-600 font-semibold border-b-[1px] border-b-zinc-200">
                        <button onClick={toggleProfile} className="w-full text-left">
                            User Profile
                            <span className="float-right">{isProfileOpen ? '▲' : '▼'}</span>
                        </button>
                        {isProfileOpen && (
                            <ul className="pl-4 space-y-3 mt-3">
                                <li>
                                    <Link href="/userprofile">View User Profile</Link>
                                </li>
                                <li>
                                    <Link href="/updateprofilepic">Update User Profile Photo</Link>
                                </li>
                                
                            </ul>
                        )}
                    </li>
                    <li className="p-4 text-zinc-600 font-semibold border-b-[1px] border-b-zinc-200">
                        <Link href="/generate-referral">Referral Link</Link>
                    </li>
                    <li className="p-4 text-zinc-600 font-semibold border-b-[1px] border-b-zinc-200">
                        <Link href="/packageupdate">Package Update</Link>
                    </li>
                    <li className="p-4 text-zinc-600 font-semibold border-b-[1px] border-b-zinc-200">
                        <Link href="kyc">KYC</Link>
                    </li>
                    <li className="p-4 text-zinc-600 font-semibold border-b-[1px] border-b-zinc-200">
                        <button onClick={toggleAffilate} className="w-full text-left">
                            Affilate Panel
                            <span className="float-right">{isAffilateOpen ? '▲' : '▼'}</span>
                        </button>
                        {isAffilateOpen && (
                            <ul className="pl-4 space-y-3 mt-3">
                                <li>
                                    <Link href="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href="/kyc">Upadte KYC</Link>
                                </li>
                                <li>
                                    <Link href="/teampage">Team Members</Link>
                                </li>
                                
                            </ul>
                        )}
                    </li>
                    
                    <li className="p-4 text-zinc-600 font-semibold border-b-[1px] border-b-zinc-200">
                        <Link href="#">User Support</Link>
                    </li>
                </ul>
                    <button className="bg-black/90 text-zinc-600 font-semibold  w-[85%] rounded-lg py-2 mt-28 ml-6">
                        <Link href="#" className="text-white font-semibold ">Logout</Link>
                    </button>
            </div>
        </aside>
    );
};

export default Sidebar;