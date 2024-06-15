"use client"

import Image from "next/image";
import Link from "next/link";

interface ProductProps {
    href: string,
    name: string
    developer: string
    image_url: string
}

const Card: React.FC<ProductProps> = ({ name, developer, href, image_url }) => {
    return (
        <Link href={href} className="group rounded-2xl cursor-pointer relative h-40 w-28 mx-auto sm:h-48 sm:w-36 md:h-56 md:w-44 lg:h-64 lg:w-52">
            <Image src={image_url} alt="ml" fill className="object-cover rounded-2xl  group-hover:brightness-90 group-hover:scale-105 ring-offset-[-2px] ring-primary group-hover:ring-offset-[3px] ring-offset-dark ring-2 transition-all duration-300 delay-100 " sizes="(min-width: 640px) 9rem, (min-width: 768px) 11rem, (min-width: 1024px) 13rem, 7rem" />
            <div className=" group-hover:opacity-100 opacity-0 flex absolute w-full bottom-0 px-4 pb-4 text-white h-full rounded-2xl group-hover:scale-105 transition-all duration-300 delay-100" style={{ backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.800))" }}>
                <div className="mt-auto w-full capitalize">
                    <p className="text-lg tracking-wide text-ellipsis whitespace-nowrap w-full overflow-hidden">{name}</p>
                    <span className="text-sm tracking-wider">{developer}</span>
                </div>
            </div>
        </Link>
    );
}

export default Card;