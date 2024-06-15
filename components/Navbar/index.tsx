"use client"

import { usePathname } from "next/navigation";
import NavUser from "./User";
import NavAdmin from "./Admin";
import { User } from "@supabase/supabase-js";

const Navbar= ({user,isAdmin}:{user:User|null,isAdmin:boolean}) => {
    const pathname = usePathname()

    return (
        <>
            {
                pathname === "/dashboard" ?
                    <NavAdmin />
                    :
                    <NavUser user={user} isAdmin={isAdmin}/>
            }
        </>
    );
}

export default Navbar;