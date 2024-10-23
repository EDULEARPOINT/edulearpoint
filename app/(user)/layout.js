"use client";

import Navbar from "../_components/Navbar";
import Sidebar from "./_components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from '@/utils/firebase_config';
import { useEffect, useState } from "react";
import Footer from "../_components/Footer"; 
// import { withUserAuth } from "./_components/withUserAuth";


function UserLayout({ children }) {
    const [user] = useAuthState(Auth);
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 768); // Tailwind's lg breakpoint is 1024px
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call once to set initial state

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-zinc-100">
            <div className="flex flex-1">
                {user && isLargeScreen && <Sidebar />}
                <main className="flex-1">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}

// export default withUserAuth(UserLayout); // Wrap the component with the role guard
export default UserLayout;
