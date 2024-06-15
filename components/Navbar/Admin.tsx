"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavAdmin = () => {
    const [menu, setMenu] = useState(false)

    return (
        <header>
            <nav className={`absolute z-10 top-0 flex flex-col h-full w-64 bg-gray-800 transition-all duration-1000 ${!menu ? "-translate-x-full" : "translate-x-0"}`}>
                <div className="flex items-center justify-between h-16 bg-gray-900 text-white px-4">
                    <div className="h-12 w-12">
                        {/* <Image width={0} height={0} src="/storage/logo-smk-sore.webp" alt="smk sore" style={{ objectFit: "cover" }} /> */}
                    </div>
                    <button onClick={() => setMenu(!menu)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="flex-1 px-2 py-4 bg-gray-800">
                        <div className="mt-3">
                            <div className="pl-5 text-sm text-gray-400 mb-1">
                                <p>MAIN MENU</p>
                            </div>
                            <Link href="/" className="flex items-center px-4 py-2  hover:bg-gray-700 text-gray-100 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M221.56,100.85,141.61,25.38l-.16-.15a19.93,19.93,0,0,0-26.91,0l-.17.15L34.44,100.85A20.07,20.07,0,0,0,28,115.55V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V164h24v44a20,20,0,0,0,20,20h48a20,20,0,0,0,20-20V115.55A20.07,20.07,0,0,0,221.56,100.85ZM204,204H164V160a20,20,0,0,0-20-20H112a20,20,0,0,0-20,20v44H52V117.28l76-71.75,76,71.75Z"></path></svg>
                                Home
                            </Link>
                        </div>
                        <div className="mt-5">
                            <div className="pl-5 text-sm text-gray-400 mb-1">
                                <p>MAIN MENU</p>
                            </div>
                            <Link href="/" className="flex items-center px-4 py-2  hover:bg-gray-700 text-gray-100 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path></svg>
                                List Game
                            </Link>
                            <Link href="/" className="flex items-center px-4 py-2  hover:bg-gray-700 text-gray-100 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M208,136H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136Zm0,64H48V152H208v48Zm0-160H48A16,16,0,0,0,32,56v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40Zm0,64H48V56H208v48ZM192,80a12,12,0,1,1-12-12A12,12,0,0,1,192,80Zm0,96a12,12,0,1,1-12-12A12,12,0,0,1,192,176Z"></path></svg>
                                Provider
                            </Link>
                        </div>
                        <div className="mt-5">
                            <div className="pl-5 text-sm text-gray-400 mb-1">
                                <p>MAIN MENU</p>
                            </div>
                            <Link href="/" className="flex items-center px-4 py-2  hover:bg-gray-700 text-gray-100 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M208,136H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136Zm0,64H48V152H208v48Zm0-160H48A16,16,0,0,0,32,56v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40Zm0,64H48V56H208v48ZM192,80a12,12,0,1,1-12-12A12,12,0,0,1,192,80Zm0,96a12,12,0,1,1-12-12A12,12,0,0,1,192,176Z"></path></svg>
                                Home
                            </Link>
                        </div>
                        <div className="mt-5">
                            <div className="pl-5 text-sm text-gray-400 mb-1">
                                <p>MAIN MENU</p>
                            </div>
                            <Link href="/" className="flex items-center px-4 py-2  hover:bg-gray-700 text-gray-100 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M221.56,100.85,141.61,25.38l-.16-.15a19.93,19.93,0,0,0-26.91,0l-.17.15L34.44,100.85A20.07,20.07,0,0,0,28,115.55V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V164h24v44a20,20,0,0,0,20,20h48a20,20,0,0,0,20-20V115.55A20.07,20.07,0,0,0,221.56,100.85ZM204,204H164V160a20,20,0,0,0-20-20H112a20,20,0,0,0-20,20v44H52V117.28l76-71.75,76,71.75Z"></path></svg>
                                Home
                            </Link>
                        </div>
                        <div className="mt-5">
                            <div className="pl-5 text-sm text-gray-400 mb-1">
                                <p>MAIN MENU</p>
                            </div>
                            <Link href="/" className="flex items-center px-4 py-2  hover:bg-gray-700 text-gray-100 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 mr-2" viewBox="0 0 256 256"><path d="M221.56,100.85,141.61,25.38l-.16-.15a19.93,19.93,0,0,0-26.91,0l-.17.15L34.44,100.85A20.07,20.07,0,0,0,28,115.55V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V164h24v44a20,20,0,0,0,20,20h48a20,20,0,0,0,20-20V115.55A20.07,20.07,0,0,0,221.56,100.85ZM204,204H164V160a20,20,0,0,0-20-20H112a20,20,0,0,0-20,20v44H52V117.28l76-71.75,76,71.75Z"></path></svg>
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="overflow-y-auto w-full">
                <div className="w-full flex justify-between items-center px-4 h-16 bg-dark my-shadow">
                    <div className="flex items-center">
                        <button className="text-primary focus:outline-none focus:brightness-50" onClick={() => setMenu(!menu)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    <p>{"auth.user.name"}</p>
                </div>
            </div>
        </header>
    );
}

export default NavAdmin;