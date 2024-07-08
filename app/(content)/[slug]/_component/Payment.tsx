"use client"

import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/hook/redux"
import { addToCheckout } from "@/context/redux/slice/user/checkoutSlice";
import { calculateFee } from "@/utils/calulateFee"
import { errorView } from "../_libs/errorView"

type Props = {
    title: string,
    type: {
        id: number,
        name: string,
        image_name: string,
        fee: string,
    }[] | null,
}

const Payment = ({ title, type }: Props) => {
    const dispatch = useAppDispatch()
    const { payment, product: { price } } = useAppSelector(state => state.chekout)
    
    const changePayment = (data: { name: string, id: number, fee: string }) => {
        if (data.id == payment.id) return dispatch(addToCheckout({
            payment: {
                ...payment,
                id: 0,
                type: "",
                fee: ""
            }
        }))
        dispatch(addToCheckout({
            payment: {
                ...payment,
                id: data.id,
                type: data.name,
                fee: data.fee
            }
        }))
    }
    const handleClickPaymentCategory = () => {
        if (!price) return errorView("product", "Silahkan pilih Nominal Top up")
        
        if (payment.category == title) {
            dispatch(addToCheckout({ payment: { category: "", prev_category: "" } }))
            return
        }
        dispatch(addToCheckout({ payment: { category: title, } }))
        const tm = setTimeout(() => {
            dispatch(addToCheckout({ payment: { prev_category: title, } }))
        }, 500);
        clearTimeout(tm)
    }

    return (
        <div className="">
            <div className="bg-[rgb(86,95,109)] px-3 md:px-4 py-2 font-semibold rounded-t-lg">
                <div className="flex justify-between tracking-wider cursor-pointer" onClick={handleClickPaymentCategory}>
                    <span>{title}</span>
                    <div className={`transition-all duration-500 text-xl flex items-center ${title == payment.category || title == payment.prev_category ? "transform-0" : "transform-180"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={"1em"} height={"1em"} fill="currentColor" viewBox="0 0 256 256"><path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path></svg>
                    </div>
                </div>
                <div className={`transition-all transform overflow-hidden duration-500 px-2 ${title == payment.category || title == payment.prev_category ? "max-h-96" : "max-h-0"}`}>
                    <div className="relative z-50 grid grid-cols-2 gap-4 md:grid-cols-3 py-3 ">
                        {
                            type?.map((data, i) => {
                                const fee = calculateFee(price, data.fee)
                                return (
                                    <div
                                        key={i}
                                        onClick={() => changePayment(data)}
                                        className={`cursor-pointer px-4 py-2 rounded-xl ring-primary transition-all duration-300 ring-2 ${payment.id == data.id ? "bg-white ring-offset-[3px] ring-offset-whbg-white" : "ring-offset-slate-300 bg-slate-300 ring-offset-[-2px]"}`}>
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
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 h-9 rounded-b-lg px-2 py-1 md:px-3 md:py-2 cursor-pointer flex justify-end items-center gap-2 md:gap-4 " onClick={handleClickPaymentCategory}>
                {type?.map((data, i: number) => {
                    return (
                        <Image key={i} src={`/${data.image_name}`} alt={data.name} width={0} height={0} className={`max-h-8 h-min w-auto transition-all duration-500 delay-400 ${title == payment.category || title == payment.prev_category ? "opacity-0" : "opacity-100"}`} sizes="100vw" style={{ maxWidth: `calc(90%/${type.length})` }} />
                    )
                })}
            </div>
        </div>
    )

}

export default Payment;