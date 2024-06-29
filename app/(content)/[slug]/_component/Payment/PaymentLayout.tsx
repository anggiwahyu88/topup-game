import Image from "next/image"
import { useId } from "react"

type Props = {
    handleClickPaymentCategory: (id: string) => void,
    isSelectPaymentCategory: {
        id: string,
        prevId: string,
    },
    children: React.ReactNode
    title: string,
    type: {
        id: number,
        name: string,
        image_name: string,
        fee: string,
    }[] | null,
}

const PaymentLayout = ({ children, title, handleClickPaymentCategory, isSelectPaymentCategory, type }: Props) => {
    const id = useId()
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
                            children
                        }

                    </div>
                </div>
            </div>
            <div className="bg-gray-100 h-9 rounded-b-lg px-2 py-1 md:px-3 md:py-2 cursor-pointer flex justify-end items-center gap-2 md:gap-4 " onClick={() => handleClickPaymentCategory(id)}>
                {type?.map((payment, i: number) => {
                    return (
                        <Image key={i} src={`/${payment.image_name}`} alt={payment.name} width={0} height={0} className={`max-h-8 h-min w-auto transition-all duration-500 delay-400 ${id == isSelectPaymentCategory.id || id == isSelectPaymentCategory.prevId ? "opacity-0" : "opacity-100"}`} sizes="100vw" style={{ maxWidth: `calc(90%/${type.length})` }} />
                    )
                })}
            </div>
        </div>
    )

}

export default PaymentLayout;