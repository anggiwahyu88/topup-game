"use client"

import { useAppDispatch, useAppSelector } from "@/hook/redux"
import { addToCheckout } from "@/utils/redux/slice/user/checkoutSlice"

const Phone = () => {
    const dispatch = useAppDispatch()
    const phone = useAppSelector(state => state.chekout.phone)

    const handleInputNumber = (value: string) => {
        if (value == "0") return dispatch(addToCheckout({ phone: value }))
        if (isNaN(Number(value))) return
        dispatch(addToCheckout({ phone: value }))
    }
    return (
        <input
            className="rounded-full h-9 px-4 py-2 w-full text-black"
            type="text"
            placeholder="08.........."
            name="phone"
            onChange={(e) => handleInputNumber(e.target.value)}
            value={phone}
        />
    )
}

export default Phone;