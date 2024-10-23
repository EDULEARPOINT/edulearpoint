"use client"
// import { Montserrat } from "next/font/google";
import "../app/globals.css";
import { usePathname } from 'next/navigation';
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";



// const inter = Montserrat({ subsets: ["latin"] });

export default function AppWrapper({ children }) {

    const pathname = usePathname()



    const pathsWithoutSidebar = ['/registration', '/login'];

    const isAdminRoute = pathname.startsWith('/admin');
    const shouldRenderSidebar = !pathsWithoutSidebar.includes(pathname) && !isAdminRoute;




    return (
        <html lang="en">
            <body >
                {/* <ToastContainer /> */}
                {/* <GlobalContextProvider> */}
                    <div className=" gap-10 overflow-hidden">
                        {shouldRenderSidebar && (
                            <div>
                                <Navbar />
                            </div>
                        )}
                        <div>
                            {children}
                        </div>
                        {shouldRenderSidebar && (
                            <div>
                                {/* <Footer /> */}
                            </div>
                        )}
                    </div>
                {/* </GlobalContextProvider> */}
            </body>
        </html>
    );
}