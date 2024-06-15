"use client"

import { calculateFee } from "@/utils/calulateFee";
import Image from "next/image";
import { useState } from "react";

const DetailItem = ({ item, game, fee }: { fee: string, item: any, game: { name: string, image_name: string } }) => {
    const [isDetail, setIsDetail] = useState(false)
    const newFee = calculateFee(item.price, fee)
    const copy = () => {
        navigator.clipboard.writeText(item.price)
    }


    return (
        <div className="w-full bg-[rgb(33,51,85)] mt-4 border border-white rounded-xl text-white">
            <div className="border-b p-4 flex justify-between">
                <div className="flex gap-4 items-center">
                    <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}game/${game.image_name}`} alt={game.name} height={50} width={50} className="rounded-xl" />
                    <span className="font-bold text-lg">{game.name}</span>
                </div>
                <button title="detail transaksi" onClick={() => setIsDetail((prev) => !prev)} className={`transition-all duration-500 text-xl flex items-center ${isDetail ? "transform-0" : "transform-180"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={"1em"} height={"1em"} fill="currentColor" viewBox="0 0 256 256"><path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path></svg>
                </button>
            </div>
            <div className={`transition-all transform overflow-hidden duration-500 px-2 ${isDetail ? "max-h-96" : "max-h-0"}`}>
                <div className="px-4 py-6">
                    <div className="mb-3">
                        <p className="font-semibold text-lg">
                            Detail
                        </p>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="col-span-1 grid gap-4">
                            <p className="">Item</p>
                            <p className="">User Id</p>
                            {item.zone_id ?
                                <p className="">Zone Id</p> : ""
                            }
                            {item.username ?
                                <p className="">Username</p> : ""
                            }
                            {item.server ?
                                <p className="">Server</p> : ""
                            }
                            <p className="">Harga</p>
                            <p className="">Fee</p>
                        </div>
                        <div className="col-span-2 grid gap-4">
                            <p className="">{item.name}</p>
                            <p className="">{item.user_id}</p>
                            {item.zone_id ?
                                <p className="">{item.zone_id}</p> : ""
                            }
                            {item.username ?
                                <p className="">{item.username}</p> : ""
                            }
                            {item.server ?
                                <p className="">{item.server}</p> : ""
                            }
                            <p className="">Rp {item.price.toLocaleString('id-ID')},-</p>
                            <p className="">Rp {newFee.toLocaleString('id-ID')},-</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`p-4 flex justify-between border-t  ${isDetail ? "border-white" : "border-transparent"} transition-all duration-500`}>
                <p className="text-lg font-semibold">Total Pembayaran</p>
                <div>
                    <span className="text-primary font-semibold">Rp {(newFee + item.price).toLocaleString('id-ID')},-</span>
                    <button title="copy" onClick={copy} className="mx-2 text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg></button>
                </div>
            </div>
        </div>
    );
}

export default DetailItem;