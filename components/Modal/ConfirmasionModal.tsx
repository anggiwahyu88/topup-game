"use client"

import { calculateFee } from "@/utils/calulateFee";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Modal {
    handleClose: () => void,
    user_id: string,
    zone_id?: string,
    server?: string,
    username?: string,
    phone: string,
    payment: {
        id: number,
        type: string,
        fee: string
    }
    product: {
        code: string;
        name: string;
        price: number;
    },
    game_id: number,
    discount: number
}

const ConfirmasionModal: React.FC<Modal> = ({ handleClose, user_id, phone, username, zone_id, product, payment, game_id, server, discount }) => {
    const router = useRouter()

    const checkOut = async () => {
        interface Item {
            username?: string;
            server?: string;
            zone_id?: string;
        }
        let item: Item = {};
        if (username) {
            item.username = username;
        }
        if (zone_id) {
            item.zone_id = zone_id;
        }
        if (server) {
            item.server = server;
        }
        const response = await fetch("/api/payment", {
            method: "POST",
            body: JSON.stringify({
                item: {
                    user_id,
                    ...item,
                    id: product.code,
                    name: product.name,
                    price: (fee + product.price) - discount,
                },
                phone,
                payment_id: payment.id,
                game_id,
            })
        })
        const data = await response.json()
        if (!data.error) {
            router.push(`/transaksi/${data.order_id}`)
            toast.success("Transaksi berhasil dibuat")
            return
        }
        toast.error(data.msg)
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
                                discount ?
                                    <div className="w-full flex justify-between mt-1 text-green-400">
                                        <p>Potongan Harga</p>
                                        <p className="font-bold">- Rp {discount.toLocaleString('id-ID')},-</p>
                                    </div> : ""
                            }
                            <div className="w-full flex justify-between mt-1">
                                <p>Sistem Pembayaran</p>
                                <p className="font-bold">{payment.type}</p>
                            </div>
                            <div className="w-full flex justify-between mt-1">
                                <p>Total Pembayaran</p>
                                <p className="font-bold">Rp {((fee + product.price) - discount).toLocaleString('id-ID')},-</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full gap-5 mt-4">
                        <button className="text-white" onClick={handleClose} type="button">Cancel</button>
                        <button className="text-dark bg-primary py-1.5 px-2.5 rounded-lg" type="button" onClick={checkOut}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path></svg>
                            Pesan Sekarang!
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ConfirmasionModal;