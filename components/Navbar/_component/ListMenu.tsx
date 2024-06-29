"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface IListMenu {
    isAdmin: boolean,
}

const ListMenu: React.FC<IListMenu> = ({ isAdmin }) => {
    const pathname = usePathname()
    
    return (
        <>
            <Link href={"/"} className={`h-full mx-4 text-white text-lg flex items-center gap-2 transition-colors ease-out y duration-200 ${pathname == "/" ? "border-white" : "hover:border-primary !border-transparent"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path></svg>
                <p>Beranda</p>
            </Link>
            <Link href={"/home"} className={`h-full mx-4 text-white text-lg flex items-center gap-2 transition-colors ease-out y duration-200 ${pathname == "/home" ? "border-white" : "hover:!border-primary !border-transparent"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path></svg>
                <p>Beranda</p>
            </Link>
            {
                isAdmin ?
                    <Link href={"/dashboard"}  className={`h-full mx-4 text-white text-lg flex items-center gap-2 transition-colors ease-out y duration-200 ${pathname == "/dashboard" ? "border-white" : "hover:!border-primary !border-transparent"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em" viewBox="0 0 256 256"><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path></svg>
                        <p>Dasboard</p>
                    </Link> : ""
            }

           
        </>

    );
}

export default ListMenu;