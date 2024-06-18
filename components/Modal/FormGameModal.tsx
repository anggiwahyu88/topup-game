"use client"

import toast from "react-hot-toast";
import Input from "../Form/Input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitButton } from "../Form/SubmitButton";
import { useFormState } from "react-dom";
import { add, update } from "./_action";
import { GameType } from "@/utils/type";

interface Modal {
    handleClose: any,
    defaultValue?: GameType | null,
    game: []
    defaultImageUrl?: string | null,
    setGames: React.Dispatch<React.SetStateAction<GameType[] | null>>
}

const FormGameModal: React.FC<Modal> = ({ handleClose, defaultValue, defaultImageUrl, game, setGames }) => {
    const defaultIsCheckId = defaultValue?.check_id ? true : false
    const action = defaultValue ? update : add
    const initialState = defaultValue ? { id: defaultValue.id, image_name: defaultValue.image_name } : null
    const pendingText = defaultValue ? "Update" : "Add"
    const title = defaultValue ? "Update" : "Add"
    const [state, formAction] = useFormState<any, FormData>(action, initialState)
    const [imageUrl, setimageUrl] = useState<string | null>(defaultImageUrl || null);
    const [imageValue, setImageValue] = useState("")
    const [isCheckId, setIsCheckId] = useState<boolean>(defaultIsCheckId)
    const [isStatus, setIsStatus] = useState<boolean>(defaultValue?.status || false)
    const [isZoneId, setIsZoneId] = useState<boolean>(defaultValue?.zone_id || false)

    useEffect(() => {
        if (state?.errors?.users) {
            toast.error(state.errors.users)
        }
        if (state?.valid) {
            if (defaultValue) {
                setGames(prev => {
                    if (prev == null) return null
                    return prev.map(game => game.id == defaultValue.id ? state.data : game)
                })
                toast.success(defaultValue.name + " has been updated")
            } else {
                setGames((prev) => prev ? [...prev, state.data] : [state.data])
                toast.success("Game has been added")
            }
            handleClose()
        }

    }, [state, handleClose,setGames, defaultValue])

    const handleFileChange = (e: React.ChangeEvent) => {
        const file = (e.target as HTMLInputElement).files?.[0] || null;
        if (file) {
            setImageValue((e.target as HTMLInputElement).value)
            setimageUrl(URL?.createObjectURL(file))
        }
    };
    const handleDeleteImage = () => {
        setImageValue("")
        setimageUrl("")
    }

    return (
        <div id="popup-modal" tabIndex={- 1} className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 w-full h-screen tracking-wide my-2`} style={{ background: "#00000021" }} >
            <div className="relative w-full max-w-2xl max-h-full left-[50%] top-[50%]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="rounded-lg shadow bg-gray-700 ">
                    <div className="bg-gray-800 relative rounded-t p-2">
                        <div className="flex items-center text-lg text-white ">
                            <p>Tambah Produk</p>
                        </div>
                        <button type="button" className="absolute top-1/2 right-[-7px] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center bg-gray-600 text-white" onClick={handleClose} style={{ transform: "translate(0, -50%)" }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-4">
                        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground !text-black">
                            <Input
                                name="name"
                                label="Nama"
                                error={state?.errors?.name}
                                defaultValue={defaultValue?.name}

                            />

                            <div className="w-full mb-4 flex flex-col gap-2">
                                <label htmlFor="descripsion" className="text-white">Deskripsi</label>
                                <textarea
                                    className={`w-full rounded-md p-2 ${state?.errors?.descripsion ? "border-2 border-red-500" : ""}`}
                                    name="descripsion"
                                    id="descripsion"
                                    defaultValue={defaultValue?.descripsion}></textarea>
                                {state?.errors?.descripsion ? <p className="text-red-500 font-semibold">{state.errors.descripsion}</p> : ""}

                            </div>

                            <Input
                                name="developer"
                                label="Developer"
                                error={state?.errors?.developer}
                                defaultValue={defaultValue?.developer}

                            />

                            <label className="text-md text-white" htmlFor="image">
                                Gambar
                            </label>
                            <div className="mb-4">
                                <input
                                    className={`${imageUrl ? "hidden" : "block"} w-full border-2 rounded-md cursor-pointer text-gray-400 focus:outline-none bg-gray-700  placeholder-gray-400 ${state?.errors?.image || state?.errors?.preview ? "border-red-500" : "border-gray-600"}`}
                                    name="image"
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                    value={imageValue}
                                    accept="image/*"
                                />
                                {imageUrl ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="preview"
                                            className="hidden"
                                            name="preview"
                                            value={imageUrl === defaultImageUrl ? 'default' : imageUrl ? 'true' : 'false'}
                                            readOnly
                                        />
                                        <div className="relative w-24 h-28">
                                            <Image src={imageUrl} alt="Preview" className="object-cover rounded-lg" fill sizes="6rem" />
                                        </div>
                                        <button className="font-medium text-xl text-red-500 " title="delete" onClick={handleDeleteImage} type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                                        </button>
                                    </div>
                                ) : (
                                    <p className="mt-1 text-sm text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                                )}
                                {state?.errors?.image || state?.errors?.preview ? <p className="text-red-500 font-semibold">{state?.errors?.image || state?.errors?.preview}</p> : ""}
                            </div>

                            <div className="flex flex-col gap-2 mb-4">
                                <label className="text-md text-white" htmlFor="name_provider">
                                    Pilih Game
                                </label>
                                <select
                                    name="name_provider"
                                    id="name_provider"
                                    className={`bg-white rounded-md px-4 py-3 bg-inherit outline-primary border-2 ${state?.errors?.name_provider ? "border-red-500" : ""}`}
                                    defaultValue={defaultValue?.name_provider || ""}
                                >
                                    <option value="" disabled>Pilih Game</option>
                                    {
                                        game?.map((data, i) => {
                                            return (
                                                <option value={data} key={i}>
                                                    {data}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                                {state?.errors?.name_provider ? <p className="text-red-500 font-semibold">{state.errors.name_provider}</p> : ""}
                            </div>

                            <div className="w-full mb-4 flex flex-col gap-2">
                                <label htmlFor="description_instructions" className="text-white">Deskripsi Petunjuk </label>
                                <textarea
                                    className={`w-full rounded-md p-2 ${state?.errors?.description_instructions ? "border-red-500 border-2" : ""}`}
                                    name="description_instructions"
                                    id="description_instructions"
                                    defaultValue={defaultValue?.description_instructions}></textarea>
                                {state?.errors?.description_instructions ? <p className="text-red-500 font-semibold">{state.errors.description_instructions}</p> : ""}
                            </div>

                            <div className="">
                                <p className="text-white mb-2">Zone ID</p>
                                <label className="inline-flex items-center cursor-pointer mx-auto gap-2 mb-2">
                                    <input type="checkbox" value="true" className="sr-only peer" name="zone_id" onChange={(e) => setIsZoneId(e.target.checked)} defaultChecked={defaultValue?.zone_id || false} />
                                    <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-800 peer-checked:bg-blue-600"></div>
                                    <p className="text-white ml-2">{isZoneId ? "Aktif" : "NonAktif"}</p>
                                </label>
                                {state?.errors?.status ? <p className="text-red-500 font-semibold mb-2">{state.errors.status}</p> : ""}
                            </div>

                            <div className="">
                                <p className="text-white mb-2">Check ID</p>
                                <label className="inline-flex items-center cursor-pointer mx-auto mb-2">
                                    <input type="checkbox" value="true" name="isCheck_id" className="sr-only peer" onChange={(e) => setIsCheckId(e.target.checked)} defaultChecked={defaultIsCheckId} />
                                    <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-800 peer-checked:bg-blue-600"></div>
                                </label>
                                {state?.errors?.isCheck_id ? <p className="text-red-500 font-semibold mb-2">{state.errors.isCheck_id}</p> : ""}

                                {isCheckId ?
                                    <Input
                                        name="check_id"
                                        label="Kode Validasi Nickname"
                                        error={state?.errors?.check_id}
                                        defaultValue={defaultValue?.check_id}
                                    />
                                    : ""
                                }
                            </div>

                            <div className="w-full mb-4 flex flex-col gap-2">
                                <label htmlFor="server_list" className="text-white">Server List </label>
                                <textarea
                                    className={`w-full rounded-md p-2 ${state?.errors?.server_list ? "border-2 border-red-500" : ""}`}
                                    name="server_list"
                                    id="server_list"
                                    defaultValue={defaultValue?.server_list || ""} cols={100}></textarea>
                                {state?.errors?.server_list ? <p className="text-red-500 font-semibold">{state.errors.server_list}</p> : ""}
                            </div>

                            <div className="">
                                <p className="text-white mb-2">Status</p>
                                <label className="inline-flex items-center cursor-pointer mx-auto gap-2 mb-2">
                                    <input type="checkbox" value="true" className="sr-only peer" name="status" onChange={(e) => setIsStatus(e.target.checked)} defaultChecked={defaultValue?.status || false} />
                                    <div className="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-900 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-800 peer-checked:bg-blue-600"></div>
                                    <p className="text-white ml-2">{isStatus ? "Aktif" : "NonAktif"}</p>
                                </label>
                                {state?.errors?.status ? <p className="text-red-500 font-semibold mb-2">{state.errors.status}</p> : ""}
                            </div>

                            <SubmitButton
                                formAction={formAction}
                                className="bg-primary text-dark rounded-md px-4 py-2 text-foreground mb-2"
                                pendingText={pendingText}
                            >
                                {title}
                            </SubmitButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormGameModal;