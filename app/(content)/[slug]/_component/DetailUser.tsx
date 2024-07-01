"use client"

import { useAppDispatch, useAppSelector } from "@/hook/redux";
import { addToCheckout } from "@/utils/redux/slice/user/checkoutSlice";

type Props = {
    isZoneId: boolean,
    description_instructions: string,
    server: string | null
}

const DetailUser = ({ isZoneId, description_instructions, server }: Props) => {
    const { zone_id, user_id } = useAppSelector(state => state.chekout)
    const dispatch = useAppDispatch()
    const handleInput = (name: string, value: string) => {
        if (name === "user_id") return dispatch(addToCheckout({ user_id: value }))
        if (name === "zone_id" && !isNaN(Number(value))) return dispatch(addToCheckout({ zone_id: value }))
    }

    return (
        <>
            <div className="flex w-full gap-5 text-dark">
                <input
                    className="rounded-full h-9 px-4 py-2 w-full"
                    type="text"
                    placeholder="User ID"
                    name="userId"
                    onChange={(e) => handleInput("user_id", e.target.value)}
                    value={user_id}
                />
                {
                    isZoneId ?
                        <input
                            className="rounded-full h-9 px-4 py-2 w-full"
                            type="text"
                            placeholder="Server ID"
                            name="zoneId"
                            onChange={(e) => handleInput("zone_id", e.target.value)}
                            value={zone_id}
                        />
                        : ""
                }
            </div>
            <p className="text-gray-400 text-sm mt-2 tracking-wide">{description_instructions}</p>
        </>
    )
}

export default DetailUser;