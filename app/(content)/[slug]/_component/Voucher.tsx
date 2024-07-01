"use client"

import Button from "@/components/Button/PrimaryButton"
import toast from "react-hot-toast"
import { useAppDispatch, useAppSelector } from "@/hook/redux"
import { addToCheckout } from "@/utils/redux/slice/user/checkoutSlice"
import { useState } from "react"

const Voucher = () => {
    const dispatch = useAppDispatch()
    const [voucher, setVoucher] = useState("")
    const [loading, setLoading] = useState(false)
    const { product: { price }, voucher: { discount } } = useAppSelector(state => state.chekout)

    const checkVoucher = async () => {
        try {
            setLoading(true)
            const checkVoucher = await fetch("api/voucher", {
                method: "POST",
                body: JSON.stringify({ code: voucher, price })
            });
            const data = await checkVoucher.json();
            if (data.error) {
                return toast.error(data.error)
            }
            dispatch(addToCheckout({ voucher: { code: voucher, discount: data.discount } }))
            toast.success("Voucher berhasil digunakan")
        } catch {

        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="flex w-full gap-4">
                <input
                    className="rounded-full h-9 px-4 py-2 w-full text-black"
                    type="text"
                    name="voucher"
                    onChange={(e) => setVoucher(e.target.value)}
                    value={voucher}
                />
                <Button onClick={checkVoucher} disabled={loading}>
                    {loading ? "Loading..." : "Gunakan"}
                </Button>
            </div>
            {
                discount ?
                    <p className="font-semibold text-green-400 mt-2">Discount {discount.toLocaleString('id-ID')}</p> : ""
            }
        </div>
    )
}

export default Voucher;