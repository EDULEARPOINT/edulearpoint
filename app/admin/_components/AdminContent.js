"use client";

import { withAdminAuth } from "./withAdminAuth";

function AdminContent({ children }) {
  return <>{children}</>;
}

export default withAdminAuth(AdminContent);
//working
