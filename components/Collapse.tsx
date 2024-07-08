"use client"

import Image from "next/image";
import Link from "next/link";

const Collapse: React.FC = () => {
    return (
        <Link href="/game/mobile-legends" className="rounded-xl bg-cover bg-no-repeat bg-center w-full flex mx-auto items-center p-1.5 cursor-pointer ring-primary ring-offset-[-2px] hover:ring-offset-2 hover:scale-[1.015] ring-offset-dark ring-2 transition-all">
            <div className="h-10 w-10 relative mx-auto sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20">
                <Image fill src={"/ml.webp"} alt="ML" className="object-cover rounded-xl" sizes="(min-width: 640px) 3.5rem, (min-width: 768px) 4rem, (min-width: 1024px) 5rem, 2.5rem"/>
            </div>
            <div className="text-white capitalize w-[calc(100%-2.5rem)] sm:w-[calc(100%-3.5rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-5rem)] px-4">
                <p className="text-lg tracking-wide text-ellipsis whitespace-nowrap w-full overflow-hidden">mobilddddddddddddddddddddddddde legens</p>
                <span className="text-sm">montong</span>
            </div>
        </Link>
    );
}

export default Collapse;