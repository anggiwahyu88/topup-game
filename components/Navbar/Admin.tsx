"use client"

import Link from "next/link";
import { logout } from "./_logout";
const NavAdmin = ({ user }: { user: string }) => {
    return (
        <header className="w-min">
            <nav className={`fixed z-20 w-16 hover:w-64 h-full bg-gray-800 transition-all ease-in-out duration-500 group overflow-hidden p-4 space-y-5`}>
                <div className="flex items-center text-gray-100 font-semibold relative mb-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256">
                            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                        </svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">{user}</p>
                </div>
                <Link href="/" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256">
                            <path d="M221.56,100.85,141.61,25.38l-.16-.15a19.93,19.93,0,0,0-26.91,0l-.17.15L34.44,100.85A20.07,20.07,0,0,0,28,115.55V208a20,20,0,0,0,20,20H96a20,20,0,0,0,20-20V164h24v44a20,20,0,0,0,20,20h48a20,20,0,0,0,20-20V115.55A20.07,20.07,0,0,0,221.56,100.85ZM204,204H164V160a20,20,0,0,0-20-20H112a20,20,0,0,0-20,20v44H52V117.28l76-71.75,76,71.75Z"></path>
                        </svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Home</p>
                </Link>
                <hr className="border border-gray-400" />

                <Link href="/dashboard/product" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M80,120h96a8,8,0,0,0,8-8V64a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8v48A8,8,0,0,0,80,120Zm8-48h80v32H88ZM200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24Zm0,192H56V40H200ZM100,148a12,12,0,1,1-12-12A12,12,0,0,1,100,148Zm40,0a12,12,0,1,1-12-12A12,12,0,0,1,140,148Zm40,0a12,12,0,1,1-12-12A12,12,0,0,1,180,148Zm-80,40a12,12,0,1,1-12-12A12,12,0,0,1,100,188Zm40,0a12,12,0,1,1-12-12A12,12,0,0,1,140,188Zm40,0a12,12,0,1,1-12-12A12,12,0,0,1,180,188Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Kelola Product</p>
                </Link>
                <Link href="/dashboard/game" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M176,112H152a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16ZM104,96H96V88a8,8,0,0,0-16,0v8H72a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM241.48,200.65a36,36,0,0,1-54.94,4.81c-.12-.12-.24-.24-.35-.37L146.48,160h-37L69.81,205.09l-.35.37A36.08,36.08,0,0,1,44,216,36,36,0,0,1,8.56,173.75a.68.68,0,0,1,0-.14L24.93,89.52A59.88,59.88,0,0,1,83.89,40H172a60.08,60.08,0,0,1,59,49.25c0,.06,0,.12,0,.18l16.37,84.17a.68.68,0,0,1,0,.14A35.74,35.74,0,0,1,241.48,200.65ZM172,144a44,44,0,0,0,0-88H83.89A43.9,43.9,0,0,0,40.68,92.37l0,.13L24.3,176.59A20,20,0,0,0,58,194.3l41.92-47.59a8,8,0,0,1,6-2.71Zm59.7,32.59-8.74-45A60,60,0,0,1,172,160h-4.2L198,194.31a20.09,20.09,0,0,0,17.46,5.39,20,20,0,0,0,16.23-23.11Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Kelola Game</p>
                </Link>
                <Link href="/dashboard/price" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM240,56H16a8,8,0,0,0-8,8V192a8,8,0,0,0,8,8H240a8,8,0,0,0,8-8V64A8,8,0,0,0,240,56ZM193.65,184H62.35A56.78,56.78,0,0,0,24,145.65v-35.3A56.78,56.78,0,0,0,62.35,72h131.3A56.78,56.78,0,0,0,232,110.35v35.3A56.78,56.78,0,0,0,193.65,184ZM232,93.37A40.81,40.81,0,0,1,210.63,72H232ZM45.37,72A40.81,40.81,0,0,1,24,93.37V72ZM24,162.63A40.81,40.81,0,0,1,45.37,184H24ZM210.63,184A40.81,40.81,0,0,1,232,162.63V184Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Kelola Harga</p>
                </Link>
                <Link href="/payment" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Kelola Pembayaran</p>
                </Link>
                <Link href="/dashboard/voucher" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.73,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.27,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.14,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.14,214.31,142.11ZM120,96a24,24,0,1,0-24,24A24,24,0,0,0,120,96ZM88,96a8,8,0,1,1,8,8A8,8,0,0,1,88,96Zm72,40a24,24,0,1,0,24,24A24,24,0,0,0,160,136Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,160,168Zm13.66-74.34-80,80a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,11.32Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Voucher</p>
                </Link>

                <Link href="/provider" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Provider</p>
                </Link>
                <Link href="/dashboard/transaction" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M28,128a8,8,0,0,1,0-16H56a8,8,0,0,0,0-16H40a24,24,0,0,1,0-48,8,8,0,0,1,16,0h8a8,8,0,0,1,0,16H40a8,8,0,0,0,0,16H56a24,24,0,0,1,0,48,8,8,0,0,1-16,0ZM232,56V192a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v40H160V160H80a8,8,0,0,1,0-16h80V112H104a8,8,0,0,1,0-16H216V64H96a8,8,0,0,1,0-16H224A8,8,0,0,1,232,56Zm-56,88h40V112H176Zm40,48V160H176v32Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Kelola Tarnsaksi</p>
                </Link>
                <Link href="/product" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <div className="hover:-rotate-12 transition-all duration-200 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,128H56a8,8,0,0,1-8-8V78.63A23.84,23.84,0,0,0,56,80H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,132Z"></path></svg>
                    </div>
                    <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Deposit</p>
                </Link>
                <form action="" className="flex items-center text-gray-100 hover:font-semibold relative">
                    <button className="w-full flex" formAction={logout}>
                        <div className="hover:-rotate-12 transition-all duration-200 ease-in-out w-min">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 256 256"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>
                        </div>
                        <p className="group-hover:opacity-100 opacity-0 transition-all duration-200 ease-out absolute w-max left-10">Log Out</p>
                    </button>
                </form>
            </nav>
        </header>
    );
}

export default NavAdmin;