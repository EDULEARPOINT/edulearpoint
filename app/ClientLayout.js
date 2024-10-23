"use client";

import AppWrapper from "@/utils/AppWrapper";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return isAdminRoute ? children : <AppWrapper>{children}</AppWrapper>;
}