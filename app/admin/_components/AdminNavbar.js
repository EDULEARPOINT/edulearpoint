"use client";
import Image from 'next/image';
import Link from 'next/link';
import logo from "@/public/images/logo.jpeg";


const AdminNavbar = ({ toggleSidebar }) => {
    return (
        <nav className="bg-white shadow-md py-4 w-[100%] fixed">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link className="block text-teal-600" href="/">
                            <span className="sr-only">Home</span>
                            <Image className='w-24 object-contain' src={logo} alt='logo' />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-black text-white font-semibold px-4 py-2 rounded-lg mr-4">
                            <Link href="/logout">Logout</Link>
                        </button>
                        <button className="md:hidden text-black font-semibold px-4 py-2 rounded-lg" onClick={toggleSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
