"use client"

import NavAdmin from "./Admin";
import NavUser from "./User";
import { usePathname } from "next/navigation";

const Content = ({ user, isAdmin }: { user: string, isAdmin: boolean }) => {
    const pathname = usePathname()

    return (
        <>
            {
                pathname.split("/")[1] === "dashboard" ?
                    <NavAdmin user={user}/>
                    :
                    <NavUser user={user} isAdmin={isAdmin} />
            }
        </>
    );
}

export default Content;