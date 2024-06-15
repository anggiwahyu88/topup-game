"use client"

import { ProductType } from "@/utils/type";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IProduct {
    product: ProductType & {
        name_image?: string | null;
    }
    setIsSelect: any,
    isSelect: {
        code: string,
        name: string,
        price: number,
    }

}

const Product: React.FC<IProduct> = ({ product, setIsSelect, isSelect }) => {
    const [isBouncing, setIsBouncing] = useState(false);

    function handleSelect(code: string) {
        if (isSelect.code != code) setIsSelect({
            code,
            name: product.name,
            price: product.price.basic
        })
    }
    useEffect(() => {
        if (isSelect.code) {
            const timeout = setTimeout(() => {
                setIsBouncing(true);
                setTimeout(() => {
                    setIsBouncing(false)
                }, 800);
            }, 5000);
            return () => clearTimeout(timeout);
        }

    }, [isBouncing, isSelect.code]);

    return (
        <div className={`cursor-pointer flex justify-between items-center rounded-xl p-2.5 md:p-4 ring-primary transition-all duration-300 ring-2 ${isSelect.code == `${product.code}` ? "bg-dark ring-offset-[3px] ring-offset-dark" : "ring-offset-[rgb(86,95,109)] hover:ring-offset-[3px] bg-[rgb(86,95,109)] ring-offset-[-2px]"} ${isSelect.code == `${product.code}` && isBouncing ? "animation" : ""}`} id={`${product.code}`} onClick={() => handleSelect(`${product.code}`)}>
            <span className="font-semibold  text-xs">
                <span>{product.name}</span>
                <div className="mt-2">
                    <span className={` ${isSelect.code == `${product.code}` ? "text-secondary" : ""}`}>Rp {product.price.basic.toLocaleString('id-ID')},-</span>
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

export default Product;