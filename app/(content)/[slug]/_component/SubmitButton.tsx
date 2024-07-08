"use client"

import ConfirmasionModal from "@/components/Modal/ConfirmasionModal";
import Button from "@/components/Button/PrimaryButton";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hook/redux";
import { addToCheckout } from "@/context/redux/slice/user/checkoutSlice";
import { errorView } from "../_libs/errorView";
import { useState } from "react";

interface Props {
    isZoneId: boolean,
    check_id: string | null,
    server: string | null
}

const SubmitButton: React.FC<Props> = ({ isZoneId, check_id, server }) => {
    const dispatch = useAppDispatch()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user_id, zone_id, payment: { id }, product, phone } = useAppSelector(state => state.chekout)

    const submit = async () => {
        try {
            setLoading(true)
            if (!user_id) return errorView("detail_user", "Silahkan isi User Id")
            if (!zone_id && isZoneId) return errorView("detail_user", "Silahkan isi Server Id")
            if (!product.code) return errorView("product", "Silahkan pilih Nominal Top up")
            if (!phone) return errorView("phoone", "Silahkan isi No WA")
            if (!id) return errorView("payment", "Silahkan pilih Pembayaran")
            if (check_id) {
                const responseCheckId = await fetch(`/api/game/check-id`, {
                    method: "POST",
                    body: JSON.stringify({ code: check_id, user_id, zone_id })
                });
                const dataCheckId = await responseCheckId.json();
                
                if (!dataCheckId.result) {
                    return errorView("detail_user", "Id tidak ditemukan")
                }
                dispatch(addToCheckout({ username: dataCheckId.data }))

            }
            setModal(true)
        } catch {

        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            {
                modal ?
                    <ConfirmasionModal
                        handleClose={() => setModal(false)}
                    />
                    : ""
            }
            <div className="mt-2 mb-36">
                <Button onClick={submit} disabled={loading} className="w-full">
                    <Image src={"/cart.svg"} alt="cart" width={
                        21} height={21} />
                    {loading ? "Loading..." : "Pesan Sekarang!"}
                </Button>
            </div>
        </>
    );
}

export default SubmitButton;