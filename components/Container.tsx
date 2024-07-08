"use client"

import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

const Container = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const isAdminPage = pathname.split("/")[1] === "dashboard" && pathname?.split("/")[2] || false
    const isCheckotPage = pathname !== "/" && pathname.split("/")[1] !== "transaksi" && pathname.split("/")[1] !== "dashboard"

    return (
        <main className="min-h-screen flex flex-col items-center pt-20">
            {
                isAdminPage || isCheckotPage ?
                    <Toaster />
                    : ""
            }
            <div className="pp">
                {children}
            </div>
        </main>
    )
}

export default Container;