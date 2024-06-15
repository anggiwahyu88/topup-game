"use client"

import dynamic from "next/dynamic";
import DetailItem from "./DetailItem";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
const Countdown = dynamic(() => import('./Countdown'), { ssr: false })
const Qris = dynamic(() => import('./Qris'), { ssr: false })
const Va = dynamic(() => import('./Va'), { ssr: false })

const Transaksi = ({ statusDefault, data, order_id }: { order_id: string, statusDefault: string, data: any }) => {
    const [status, setStatus] = useState(statusDefault)
    const objDate = new Date(data.created_at);
    const newDate = objDate.getDate() + '/' + (objDate.getMonth() + 1) + '/' + objDate.getFullYear();
    const handleInserts = useCallback((payload: any) => {
        if (payload.new.order_id == order_id) {
            setStatus(payload.new.status_transaction)
            if (payload.new.status_transaction == "settlement") {
                toast.success("Pembayaran berhasil")
            }
            if (payload.new.status_transaction == "expire") {
                toast.error("Transaksi telah kadaluarsa")
            }
        }

    }, [order_id])
    useEffect(() => {
        const supabase = createClient()
        supabase
            .channel('todos')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'transaction' }, handleInserts)
            .subscribe()
    }, [handleInserts])

    return (
        <div className="pp">
            <Countdown targetDate={data.exp} status={status} />
            <div className="grid grid-cols-1 lg:grid-cols-3 mb-8">
                <section className="mt-8 lg:col-span-1">
                    <div className="text-white font-semibold text-sm mb-2">
                        <p>Proses Transaksi</p>
                    </div>
                    <div className="flex items-center relative">
                        <div aria-hidden className="absolute left-4 top-8 -ml-px mt-0.5 h-full w-0.5 bg-green-500">
                        </div>
                        <div className=" h-8 w-8 rounded-full bg-green-500 text-white flex justify-center items-center text-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-green-500 font-semibold">Transaksi Dibuat</span>
                            <span className="text-white text-xs">Transaksi berhasil dibuat.
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center relative mt-6">
                        {status == "settlement" ?
                            <div aria-hidden className="absolute left-4 top-8 -ml-px mt-0.5 h-full w-0.5 bg-green-500">
                            </div> : ""
                        }
                        <div className={`h-8 w-8 rounded-full text-white flex justify-center items-center text-xl ${status == "pending" ? "border-2 border-primary bg-dark" : ""} ${status == "settlement" ? "bg-green-500" : ""} ${status == "expire" ? "bg-red-500" : ""}`}>
                            {status == "pending" ?
                                <div className="h-4 w-4 bg-primary rounded-full">
                                </div>
                                : ""
                            }
                            {
                                status == "settlement" ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg> : ""
                            }
                            {
                                status == "expire" ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg> : ""
                            }
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className={`font-semibold ${status == "pending" ? "text-primary" : ""} ${status == "settlement" ? "text-green-500" : ""} ${status == "expire" ? "text-red-500" : ""}`}>Pembayaran</span>
                            <span className="text-white text-xs">
                                {
                                    status == "pending" ? "Silahkan melakukan pembayaran." : ""
                                }
                                {
                                    status == "settlement" ? "Pembayaran berhasil." : ""
                                }
                                {
                                    status == "expire" ? "Pembayaran sudah kadaluarsa." : ""
                                }
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center relative mt-6">
                        <div className={`${status == "settlement" ? "bg-green-500" : "border-2 border-white "} h-8 w-8 rounded-full text-white flex justify-center items-center text-xl`}>
                            {status == "settlement" ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg> : ""
                            }
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className={`${status == "settlement" ? "text-green-500" : "text-white "} font-semibold`}>Selesai</span>
                            <span className="text-white text-xs">Transaksi selesai.
                            </span>
                        </div>
                    </div>
                    {
                        status == "pending" ?
                            <div className="mt-6 text-white">
                                <p className="font-semibold text-lg ">Metode Pembayaran</p>
                                <p className="text-sm text-foreground">{data.payment.name}</p>

                                <div className="mt-4">
                                    {
                                        data?.action?.map((payment: any, i: number) => {
                                            if (data.payment.name_provider == "qris" && payment.name == "generate-qr-code") {
                                                return (
                                                    <Qris url={payment.url} key={i} />
                                                )
                                            }
                                            if (data.payment.name_provider == "bni" || data.payment.name_provider == "bri" || data.payment.name_provider == "cimb" || data.payment.name_provider == "permata") {
                                                return (
                                                    <Va key={i} code={payment.va_number} />
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            : ""
                    }
                </section>
                <section className="lg:col-span-2 mt-8">
                    <div className="w-full border border-white rounded-xl bg-[rgb(33,51,85)]">
                        <div className="flex justify-around py-3">
                            <div>
                                <p className="text-slate-300 font-medium">Tanggal Pembelian</p>
                                <span className="text-white font-semibold text-sm">{newDate}</span>
                            </div>
                            <div>
                                <p className="text-slate-300 font-medium">No pesanan</p>
                                <span className="text-white font-semibold text-sm">{data.order_id}</span>
                            </div>
                            <div>
                                <p className="text-slate-300 font-medium">Status</p>
                                <span className="text-white font-semibold text-sm">
                                    {status == "expire" ? "Kadaluarsa" : ""}
                                    {status == "pending" ? "Belum bayar" : ""}
                                    {status == "settlement" ? "Succses" : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                    <DetailItem item={data.customer_detail.item} game={data.game} fee={data.payment.fee} />
                </section>
            </div>
        </div>
    );
}

export default Transaksi;