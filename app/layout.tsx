
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();
  let response
  if (user) response = await supabase.from("user").select("role").eq("id", user?.id).single()

  return (
    <html lang="en">
      <Navbar user={user} isAdmin={response?.data?.role =="admin"||false}/>
      <body className="bg-dark">
        <main className="min-h-screen flex flex-col items-center pt-20">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
