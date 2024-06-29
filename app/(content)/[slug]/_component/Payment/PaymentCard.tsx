"use client"

import Image from "next/image";
import { calculateFee } from "@/utils/calulateFee";

type Props = {
    isPayment: {
        id: number,
        type: string
    },
    handleClickPayment: React.Dispatch<React.SetStateAction<{
        id: number,
        type: string,
        fee: string
    }>>,
    type: {
        id: number,
        name: string,
        image_name: string,
        fee: string,
    }[] | null,
    price: number,
}


const PaymentCard = ({ isPayment, handleClickPayment, type, price }: Props) => {
    const changePayment = (data: { name: string, id: number, fee: string }) => {
        handleClickPayment((prev) => prev.id == data.id ? {
            id: 0,
            type: "",
            fee: ""
        } : {
            id: data.id,
            type: data.name,
            fee: data.fee
        })
    }
    return (
        <>
            {
                type?.map((data, i) => {
                    const fee = calculateFee(price, data.fee)
                    return (
                        <div
                            key={i}
                            onClick={() => changePayment(data)}
                            className={`cursor-pointer px-4 py-2 rounded-xl ring-primary transition-all duration-300 ring-2 ${isPayment.id == data.id ? "bg-white ring-offset-[3px] ring-offset-whbg-white" : "ring-offset-slate-300 bg-slate-300 ring-offset-[-2px]"}`}>
                            <Image src={`/${data.image_name}`} alt={data.name} width={0} height={0} className="max-w-full w-auto max-h-8 mr-auto" sizes="100vw" />
                            <div className="text-black mt-3">
                                <span className="md:text-base text-sm">
                                    Rp {(price + fee).toLocaleString('id-ID')},-
                                </span>
                                <div className="italic border-t-2 border-gray-800 w-full mt-2 text-gray-700 text-xs md:text-sm">
                                    <span>
                                        proses otomatis
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </>
    );
}

export default PaymentCard;