"use client"

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hook/redux";
import { useEffect, useState } from "react";
import { addToCheckout } from "@/utils/redux/slice/user/checkoutSlice";
import { ProductType } from "@/utils/type";

interface IProduct {
    product: ProductType & {
        name_image?: string | null;
    },
    game_id:number
}

const Card: React.FC<IProduct> = ({ product,game_id }) => {
    const [isBouncing, setIsBouncing] = useState(false);
    const { code } = useAppSelector(state => state.chekout.product)
    const dispatch = useAppDispatch()

    function handleSelect() {
        if (code == product.code) return
    
        dispatch(addToCheckout({ game_id, product: { code: product.code, name: product.name, price: product.price.basic } }))
    }
    useEffect(() => {
        if (code == product.code) {
            const timeout = setTimeout(() => {
                setIsBouncing(true);
                setTimeout(() => {
                    setIsBouncing(false)
                }, 800);
            }, 5000);
            return () => clearTimeout(timeout);
        }

    }, [isBouncing, code, product.code]);

    return (
        <div className={`cursor-pointer flex justify-between items-center rounded-xl p-2.5 md:p-4 ring-primary transition-all duration-300 ring-2 ${code == `${product.code}` ? "bg-dark ring-offset-[3px] ring-offset-dark" : "ring-offset-[rgb(86,95,109)] hover:ring-offset-[3px] bg-[rgb(86,95,109)] ring-offset-[-2px]"} ${code == `${product.code}` && isBouncing ? "animation" : ""}`} id={`${product.code}`} onClick={handleSelect}>
            <span className="font-semibold  text-xs">
                <span>{product.name}</span>
                <div className="mt-2">
                    <span className={` ${code == `${product.code}` ? "text-secondary" : ""}`}>Rp {product.price.basic.toLocaleString('id-ID')},-</span>
                </div>
            </span>
            {
                product.name_image ?
                    <div className="relative min-h-8 min-w-8 h-8 w-8">
                        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}logo/${product.name_image}`} fill alt={"sdaa"} sizes="2rem" />
                    </div>
                    : ""
            }
        </div>
    );
}

export default Card;