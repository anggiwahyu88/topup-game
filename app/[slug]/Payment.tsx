"use client"
import { calculateFee } from "@/utils/calulateFee";
import Image from "next/image";
import { title } from "process";
import { useId, useState } from "react";

type Props = {
    handleClickPaymentCategory: (id: string) => void,
    isSelectPaymentCategory: {
        id: string,
        prevId: string,
    },
    isPayment: {
        id: number,
        type: string
    },
    handleClickPayment: React.Dispatch<React.SetStateAction<{
        id: number,
        type: string,
        fee:string
    }>>,
    type: {
        id: number,
        name: string,
        image_name: string,
        fee: string,
    }[] | null,
    price: number,
    title: string
}


const Payment = ({ title, handleClickPaymentCategory, isSelectPaymentCategory, isPayment, handleClickPayment, type, price }: Props) => {
    const id = useId()
    const changePayment = (data: { name: string, id: number,fee:string }) => {
        handleClickPayment((prev) => prev.id == data.id ? {
            id: 0,
            type: "",
            fee:""
        } : {
            id: data.id,
            type: data.name,
            fee:data.fee
        })
    }
    return (
        <div id={id} className="">
            <div className="bg-[rgb(86,95,109)] px-3 md:px-4 py-2 font-semibold rounded-t-lg">
                <div className="flex justify-between tracking-wider cursor-pointer" onClick={() => handleClickPaymentCategory(id)}>
                    <span>{title}</span>
                    <div className={`transition-all duration-500 text-xl flex items-center ${id == isSelectPaymentCategory.id || id == isSelectPaymentCategory.prevId ? "transform-0" : "transform-180"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={"1em"} height={"1em"} fill="currentColor" viewBox="0 0 256 256"><path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path></svg>
                    </div>
                </div>
                <div className={`transition-all transform overflow-hidden duration-500 px-2 ${id == isSelectPaymentCategory.id || id == isSelectPaymentCategory.prevId ? "max-h-96" : "max-h-0"}`}>
                    <div className="relative z-50 grid grid-cols-2 gap-4 md:grid-cols-3 py-3 ">
                        {
                            type?.map((data, i) => {
                                const fee = calculateFee(price,data.fee)
                                return (
                                    <div
                                        key={i}
                                        onClick={() => changePayment(data)}
                                        className={`cursor-pointer px-4 py-2 rounded-xl ring-primary transition-all duration-300 ring-2 ${isPayment.id == data.id ? "bg-white ring-offset-[3px] ring-offset-whbg-white" : "ring-offset-slate-300 bg-slate-300 ring-offset-[-2px]"}`}>
                                        <Image src={`/${data.image_name}`} alt={data.name} width={0} height={0} className="w-auto max-w-60 h-8 mr-auto" sizes="100vw" />
                                        <div className="text-black mt-3">
                                            <span>
                                                Rp {(price+fee).toLocaleString('id-ID')},-
                                            </span>
                                            <div className="italic border-t-2 border-gray-800 w-full mt-2 text-gray-700 text-sm">
                                                <span>
                                                    proses otomatis
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <div className="bg-gray-100 rounded-b-lg px-2 py-1 md:px-3 md:py-2 cursor-pointer flex justify-end gap-4" onClick={() => handleClickPaymentCategory(id)}>
                {type?.map((payment, i: number) => {
                    return (
                        <Image key={i} src={`/${payment.image_name}`} alt={payment.name} width={0} height={0} className={`w-auto max-w-60 h-8 transition-all duration-500 delay-400 ${id == isSelectPaymentCategory.id || id == isSelectPaymentCategory.prevId ? "opacity-0" : "opacity-100"}`} sizes="100vw" />
                    )
                })}
            </div>
        </div>
    );
}

export default Payment;