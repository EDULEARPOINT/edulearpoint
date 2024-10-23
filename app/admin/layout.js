"use client";
import { useEffect, useState } from 'react';
import AdminSidebar from './_components/AdminSidebar';
import AdminNavbar from './_components/AdminNavbar';

export default function AdminLayout({ children }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-auto">
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        {isLargeScreen ? (
          <AdminSidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} />
        ) : (
          <AdminSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        )}
        <main className="flex-1 py-3 mt-28">
          {children}
        </main>
      </div>
    </div>
  );
}
