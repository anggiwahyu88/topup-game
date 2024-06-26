
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar/page";
import StoreProvider from "@/utils/redux/store/StoreProvider";

const defaultUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className="bg-dark">
          <Navbar />
          <main className="min-h-screen flex flex-col items-center pt-20">
            <Toaster />
            {children}
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
