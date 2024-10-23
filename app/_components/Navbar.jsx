"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { Auth } from "@/utils/firebase_config";
import { signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from "@/public/images/logo.jpeg";

const Navbar = () => {
  const [user] = useAuthState(Auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAffilateOpen, setIsAffilateOpen] = useState(false);

  const logOut = async () => {
    await signOut(Auth);
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleAffilate = () => setIsAffilateOpen(!isAffilateOpen);

  const isHomePage = pathname === "/";

  return (
    <header
      className={`w-screen bg-white py-4 z-[100] shadow-lg fixed ${
        isHomePage ? "fixed top-0 z-50 shadow-lg" : "relative"
      }`}
    >
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <Image className="w-24 object-contain" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-12">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-base">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-700"
                    href="/aboutus"
                  >
                    {" "}
                    About Us{" "}
                  </Link>
                </li>
                {/* <li>
                  <Link className="text-gray-500 transition hover:text-gray-700" href="/courses"> Courses </Link>
                </li> */}
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-700"
                    href="/contactus"
                  >
                    {" "}
                    Contact Us{" "}
                  </Link>
                </li>
              </ul>
            </nav>
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/userprofile"
                  className="text-gray-500 hover:text-gray-700"
                >
                  {user.displayName || user.email}
                </Link>
                <button
                  onClick={logOut}
                  className="bg-black text-white rounded-lg px-4 py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                className="rounded-md bg-indigo-600 px-5 py-2.5 text-base font-medium text-white shadow"
                href="/login"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-40 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 bg-gray-800 bg-opacity-75`}
      >
        <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl overflow-y-auto">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              {user ? (
                <>
                  <li className="border-b border-gray-200 pb-2">
                    <button
                      onClick={toggleProfile}
                      className="w-full text-left flex justify-between items-center"
                    >
                      <span>User Profile</span>
                      <span>{isProfileOpen ? "▲" : "▼"}</span>
                    </button>
                    {isProfileOpen && (
                      <ul className="pl-4 space-y-2 mt-2">
                        <li>
                          <Link href="/userprofile" onClick={toggleSidebar}>
                            View User Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/updateprofilepic"
                            onClick={toggleSidebar}
                          >
                            Update User Profile Photo
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <Link href="/generate-referral" onClick={toggleSidebar}>
                      Referral Link
                    </Link>
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <Link href="/packageupdate" onClick={toggleSidebar}>
                      Package Update
                    </Link>
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <Link href="/kyc" onClick={toggleSidebar}>
                      KYC
                    </Link>
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <button
                      onClick={toggleAffilate}
                      className="w-full text-left flex justify-between items-center"
                    >
                      <span>Affiliate Panel</span>
                      <span>{isAffilateOpen ? "▲" : "▼"}</span>
                    </button>
                    {isAffilateOpen && (
                      <ul className="pl-4 space-y-2 mt-2">
                        <li>
                          <Link href="/dashboard" onClick={toggleSidebar}>
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link href="/kyc" onClick={toggleSidebar}>
                            Update KYC
                          </Link>
                        </li>
                        <li>
                          <Link href="/teampage" onClick={toggleSidebar}>
                            Team Members
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="border-b border-gray-200 pb-2">
                    <Link href="#" onClick={toggleSidebar}>
                      User Support
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logOut();
                        toggleSidebar();
                      }}
                      className="w-full bg-black text-white rounded-lg py-2 mt-4"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="text-gray-600 transition hover:text-gray-800"
                      href="/aboutus"
                      onClick={toggleSidebar}
                    >
                      {" "}
                      About Us{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 transition hover:text-gray-800"
                      href="/courses"
                      onClick={toggleSidebar}
                    >
                      {" "}
                      Courses{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-gray-600 transition hover:text-gray-800"
                      href="/contactus"
                      onClick={toggleSidebar}
                    >
                      {" "}
                      Contact Us{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="w-full bg-indigo-600 rounded-md text-white py-2 mt-4 text-center block"
                      href="/login"
                      onClick={toggleSidebar}
                    >
                      Login
                    </Link>
                    <Link
                      className="w-full bg-red-600 rounded-md text-white py-2 mt-4 text-center block"
                      href="/registration"
                      onClick={toggleSidebar}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      {/* {user && (
        <div className="hidden md:flex flex-col w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
          <nav className="p-4">
            <ul className="space-y-4">
              <li className="border-b border-gray-200 pb-2">
                <button onClick={toggleProfile} className="w-full text-left flex justify-between items-center">
                  <span>User Profile</span>
                  <span>{isProfileOpen ? '▲' : '▼'}</span>
                </button>
                {isProfileOpen && (
                  <ul className="pl-4 space-y-2 mt-2">
                    <li><Link href="/userprofile">View User Profile</Link></li>
                    <li><Link href="/updateprofilepic">Update User Profile Photo</Link></li>
                  </ul>
                )}
              </li>
              <li className="border-b border-gray-200 pb-2">
                <Link href="/generate-referral">Referral Link</Link>
              </li>
              <li className="border-b border-gray-200 pb-2">
                <Link href="/packageupdate">Package Update</Link>
              </li>
              <li className="border-b border-gray-200 pb-2">
                <Link href="/kyc">KYC</Link>
              </li>
              <li className="border-b border-gray-200 pb-2">
                <button onClick={toggleAffilate} className="w-full text-left flex justify-between items-center">
                  <span>Affiliate Panel</span>
                  <span>{isAffilateOpen ? '▲' : '▼'}</span>
                </button>
                {isAffilateOpen && (
                  <ul className="pl-4 space-y-2 mt-2">
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/kyc">Update KYC</Link></li>
                    <li><Link href="/teampage">Team Members</Link></li>
                  </ul>
                )}
              </li>
              <li className="border-b border-gray-200 pb-2">
                <Link href="#">User Support</Link>
              </li>
              <li>
                <button onClick={logOut} className='w-full bg-black text-white rounded-lg py-2 mt-4'>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )} */}
    </header>
  );
};

export default Navbar;
