"use client"

import Button from "../Button/PrimaryButton";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAppSelector } from "@/hook/redux";
import { calculateFee } from "@/utils/calulateFee";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Modal {
    handleClose: () => void,
}

const ConfirmasionModal: React.FC<Modal> = ({ handleClose }) => {
    const router = useRouter()
    const { user_id, zone_id, server, username, phone, product, voucher, game_id, payment } = useAppSelector(state => state.chekout)
    const [loading, setLoading] = useState(false)

    const checkOut = async () => {
        setLoading(true)
        interface Item {
            username?: string;
            server?: string;
            zone_id?: string;
        }
        let item: Item = {};
        if (username) item.username = username;
        if (zone_id) item.zone_id = zone_id;
        if (server) item.server = server;
        const response = await fetch("/api/payment", {
            method: "POST",
            body: JSON.stringify({
                item: {
                    user_id,
                    ...item,
                    ...product
                },
                phone,
                payment_id: payment.id,
                game_id: game_id,
                voucher: voucher.code
            })
        })
        const data = await response.json()
        if (!data.error) {
            router.push(`/transaksi/${data.order_id}`)
            toast.success("Transaksi berhasil dibuat")
            return
        }
        toast.error(data.msg)
        setLoading(false)
        handleClose()
    }
    const fee = calculateFee(product.price, payment.fee)

    return (
        <div id="popup-modal" tabIndex={- 1} className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 max-h-full text-white tracking-wide`} style={{ background: "rgba(0, 0, 0, 0.4)" }} >
            <div className="relative w-full max-w-2xl max-h-full left-[50%] top-[50%]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="rounded-lg shadow bg-gray-700 p-4">
                    <div>
                        <h1 className="font-bold text-lg">Detail Pesanan</h1>
                        <p className="mt-2 text-sm">
                            Jika Data Pesanan Kamu Sudah Benar Klik{" "}
                            <span className="font-bold">Beli Sekarang</span>
                        </p>
                    </div>
                    <div className="mt-4 ">
                        <h2 className="font-bold before:content-['●'] before:mr-1 before:text-primary">Data Player</h2>
                        <div className="w-full text-sm">
                            <div className="w-full flex justify-between mt-1">
                                <p>USER ID</p>
                                <p className="font-bold">{user_id}</p>
                            </div>
                            {zone_id ? <div className="w-full flex justify-between mt-1">
                                <p>ZONE ID</p>
                                <p className="font-bold">{zone_id}</p>
                            </div> : ""}
                            {
                                server ? <div className="w-full flex justify-between mt-1">
                                    <p>Server</p>
                                    <p className="font-bold">{server}</p>
                                </div> : ""
                            }
                            {username ? <div className="w-full flex justify-between mt-1">
                                <p>USERNAME</p>
                                <p className="font-bold">{username}</p>
                            </div> : ""}
                        </div>
                    </div>
                    <div className="mt-4 ">
                        <h2 className="font-bold before:content-['●'] before:mr-1 before:text-primary">Ringkasan Pembelian</h2>
                        <div className="w-full text-sm">
                            <div className="w-full flex justify-between mt-1">
                                <p>Nomor Handphone</p>
                                <p className="font-bold">{phone}</p>
                            </div>
                            <div className="w-full flex justify-between mt-1">
                                <p>Harga</p>
                                <p className="font-bold">Rp {product.price.toLocaleString('id-ID')},-</p>
                            </div>
                            <div className="w-full flex justify-between mt-1">
                                <p>Fee</p>
                                <p className="font-bold">Rp {fee.toLocaleString('id-ID')},-</p>
                            </div>
                            {
                                voucher.discount ?
                                    <div className="w-full flex justify-between mt-1 text-green-400">
                                        <p>Potongan Harga</p>
                                        <p className="font-bold">- Rp {voucher.discount.toLocaleString('id-ID')},-</p>
                                    </div> : ""
                            }
                            <div className="w-full flex justify-between mt-1">
                                <p>Sistem Pembayaran</p>
                                <p className="font-bold">{payment.type}</p>
                            </div>
                            <div className="w-full flex justify-between mt-1">
                                <p>Total Pembayaran</p>
                                <p className="font-bold">Rp {((fee + product.price) - voucher.discount).toLocaleString('id-ID')},-</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full gap-5 mt-4">
                        <button className="text-white" onClick={handleClose} type="button">Cancel</button>
                        <Button onClick={checkOut} disabled={loading} className="px-4">
                            {
                                loading ? "Loading..." :
                                    <>
                                        <Image src="/cart.svg" alt="cart" width={21} height={21} />
                                        <span className="font-semibold">
                                        CHECKOUT
                                        </span>
                                    </>
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ConfirmasionModal;