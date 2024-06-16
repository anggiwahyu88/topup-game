"use client"

import { logout } from "./_logout";
import ListMenu from "./ListMenu";
import Link from "next/link";

const NavUser = ({ user, isAdmin }: { user: any, isAdmin: boolean }) => {

    return (
        <header className="h-16 w-full my-shadow fixed z-20 bg-dark">
            <nav className="flex flex-col items-center h-full">
                <div className="max-w-screen-xl w-full px-4 flex h-full">
                    <div className="h-14 w-14 text-white border border-white">
                        LOGO
                    </div>
                    <ListMenu isAdmin={isAdmin} />
                    <div className='ml-auto flex gap-6 items-center text-white '>
                        {
                            user == null ?
                                <>
                                    <Link href={"/auth/login"} className=' text-lg'>Masuk</Link>
                                    <Link href={"/auth/signup"} className='bg-primary text-md px-4 py-1 rounded-lg hover:brightness-75 transition-all duration-300 font-medium'>Daftar</Link>
                                </>
                                :
                                <>
                                    <p>{user?.user_metadata.fullname}</p>
                                    <form className='flex items-center'>
                                        <button className='bg-primary text-md px-4 py-1 rounded-lg hover:brightness-75 transition-all duration-300 font-medium text-dark' formAction={logout}>Log out</button>
                                    </form>
                                </>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavUser;