// app/layout.js
import { GlobalContextProvider } from "@/utils/GlobalContext";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "EdulearPoint",
  description: "A Learning platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body>
        <GlobalContextProvider>
          <ClientLayout>{children}</ClientLayout>
        </GlobalContextProvider>
      </body>
    </html>
  );
}