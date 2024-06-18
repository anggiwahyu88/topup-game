"use client"

import { User } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import NavAdmin from "./Admin";
import NavUser from "./User";

const Content = ({ user, isAdmin }: { user: User | null, isAdmin: boolean }) => {
    const pathname = usePathname()

    return (
        <>
            {
                pathname.split("/")[1] === "dashboard" ?
                    <NavAdmin />
                    :
                    <NavUser user={user} isAdmin={isAdmin} />
            }
        </>
    );
}

export default Content;