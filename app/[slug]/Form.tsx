"use client"

import ConfirmasionModal from "@/components/Modal/ConfirmasionModal";
import Wrappper from "./Wrapper";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { PaymentType, ProductType } from "@/utils/type";
import Product from "./Product";
import Payment from "./Payment";

interface IForm {
    game: {
        id: number;
        name: string;
        developer: string;
        zone_id: boolean;
        descripsion: string;
        description_instructions: string;
        check_id: string;
    },
    payments: PaymentType[] | null,
    imageGame: string,
    products: {
        normal: (ProductType & {
            name_image?: string | null;
        })[];
        spesial: (ProductType & {
            name_image?: string | null;
        })[];
    }
}

interface IsSelect {
    code: string;
    name: string;
    price: number;
}

const Form: React.FC<IForm> = ({ game, imageGame, products, payments }) => {
    const [modal, setModal] = useState(false)
    const [userId, setUserId] = useState("")
    const [zoneId, setZoneId] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSelect, setIsSelect] = useState<IsSelect>({
        code: "",
        name: "",
        price: 0
    })
    const [isSelectPaymentCategory, setIsSelectPayment] = useState({
        id: "",
        prevId: "",
    })
    const [payment, SetPayment] = useState({
        id: 0,
        type: "",
        fee: ""
    })

    const handleClickPaymentCategory = (id: string) => {
        if (id == isSelectPaymentCategory.id) {
            setIsSelectPayment({
                id: "",
                prevId: ""
            })
            return
        }
        setIsSelectPayment((prev) => {
            return {
                ...prev,
                id,
            }
        })
        const tm = setTimeout(() => {
            setIsSelectPayment((prev) => {
                return {
                    ...prev,
                    prevId: id
                }
            })
        }, 500);
        clearTimeout(tm)
    }

    const refUserId = useRef(null)
    const refNominal = useRef()
    const refPayment = useRef()
    const refPhone = useRef()


    const handleInputNumber = (value: string) => {
        if (value == "0") return setPhone(value)
        if (isNaN(Number(value))) return
        setPhone(value)
    }
    const goto = (ref: any) => {
        scrollTo({
            top: ref.current.offsetTop - 70,
            left: 0,
            behavior: "smooth"
        })
    }
    const submit = async () => {
        try {

            setLoading(true)
            if (!userId) {
                goto(refUserId)
                return toast.error("Silahkan isi Id")
            }
            if (game.zone_id && !zoneId) {
                goto(refUserId)
                return toast.error("Silahkan isi Server Id")
            }
            if (!isSelect.code) {
                goto(refNominal)
                return toast.error("Silahkan pilih Nominal Top up")
            }
            if (!phone) {
                goto(refPhone)
                return toast.error("Silahkan isi No WA")
            }
            if (game.check_id) {
                const response = await fetch(`/api/game/check-id`, {
                    method: "POST",
                    body: JSON.stringify({
                        user_id: userId,
                        zone_id: zoneId,
                        code: game.check_id
                    })
                })
                const responseUsername = await response.json()
                if (!responseUsername.result) {
                    goto(refUserId)
                    setLoading(false)
                    return toast.error("Id tidak ditemukan")
                }
                setUsername(responseUsername.data)
            }
            setModal(true)
        } catch {

        } finally {
            setLoading(false)
        }
    }


    return (
            <form className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-y-6 lg:gap-x-6">
                {
                    modal ?
                        <ConfirmasionModal
                            game_id={game.id}
                            handleClose={() => setModal(false)}
                            user_id={userId}
                            zone_id={zoneId}
                            username={username}
                            phone={phone}
                            product={isSelect}
                            payment={payment} />
                        : ""
                }
                <div className="w-full h-min my-shadow rounded-md p-6 text-white">
                    <div className="flex">
                        <div className="relative w-28 h-28" style={{ perspective: "20em" }}>
                            <Image src={imageGame} alt="ml" fill className="object-cover rounded-md my-3d" sizes="7rem" />
                        </div>
                        <div className="w-[calc(100%-7rem)] px-2 flex flex-col justify-center gap-2">
                            <h1 className="text-xl font-semibold tracking-wide text-ellipsis whitespace-nowrap w-full overflow-hidden">{game?.name}</h1>
                            <h2 className="text-sm tracking-wider">{game?.developer}</h2>
                        </div>
                    </div>
                    <div className="mt-4 pt-2 border-top border-white">
                        <p>
                            {game.descripsion}
                        </p>
                    </div>
                </div>
                <div className="col-span-2 grid gap-4">
                    <Wrappper title="Masukkan User ID" no={1} id={refUserId}>
                        <div className="flex w-full gap-5 text-dark">
                            <input
                                className="rounded-full h-9 px-4 py-2 w-full"
                                type="text"
                                placeholder="User ID"
                                name="userId"
                                onChange={(e) => setUserId(e.target.value)}
                                value={userId}
                            />
                            {
                                game.zone_id ?
                                    <input
                                        className="rounded-full h-9 px-4 py-2 w-full"
                                        type="text"
                                        placeholder="Server ID"
                                        name="zoneId"
                                        onChange={(e) => setZoneId(e.target.value)}
                                        value={zoneId}
                                    />
                                    : ""
                            }
                        </div>
                        <p className="text-gray-400 text-sm mt-2 tracking-wide">{game.description_instructions}</p>
                    </Wrappper>
                    <Wrappper title="Pilih Nominal Top Up" no={2} id={refNominal}>
                        {
                            products.spesial[0] ?
                                <>
                                    <div>
                                        <span className="font-bold text-sm">Special Item</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4 mb-4" >
                                        {products?.spesial?.map((product, i) => {
                                            return (
                                                <Product key={i} product={product} isSelect={isSelect} setIsSelect={setIsSelect} />
                                            )
                                        })}
                                    </div>
                                </> : ""
                        }
                        <div>
                            <span className="font-bold text-sm">Top Up Instant</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4" >
                            {products.normal.map((product, i) => {
                                return (
                                    <Product key={i} product={product} isSelect={isSelect} setIsSelect={setIsSelect} />
                                )
                            })}
                        </div>
                    </Wrappper>
                    <Wrappper title="Pilih Pembayaran" no={3} id={refPayment}>
                        <div className="grid grid-cols-1 gap-4 mt-4" >
                            {
                                payments?.map((data, i) => {
                                    return (
                                        <Payment
                                            key={i}
                                            title={data.name}
                                            isSelectPaymentCategory={isSelectPaymentCategory}
                                            handleClickPaymentCategory={handleClickPaymentCategory}
                                            isPayment={payment}
                                            handleClickPayment={SetPayment}
                                            type={data.type}
                                            price={isSelect.price}
                                        />
                                    )
                                })
                            }
                        </div>
                    </Wrappper>
                    <Wrappper title="Masukan No WA" no={4} id={refPhone}>
                        <input
                            className="rounded-full h-9 px-4 py-2 w-full text-black"
                            type="text"
                            placeholder="08.........."
                            name="phone"
                            onChange={(e) => handleInputNumber(e.target.value)}
                            value={phone}
                        />
                    </Wrappper>
                    <div className="mt-2 mb-36">
                        <button onClick={submit} type="button" className="w-full bg-primary text-dark rounded-xl py-2  tracking-wider hover:brightness-75 transition-all duration-300 flex items-center justify-center gap-2 text-md disabled:brightness-75 " disabled={loading}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path></svg>
                            {loading ? "Loading..." : "Pesan Sekarang!"}
                        </button>
                    </div>
                </div>
            </form>
    );
}

export default Form;