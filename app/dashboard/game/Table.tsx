"use client"

import AddButton from "@/components/Button/AddButton"
import DeleteButton from "@/components/Button/DeleteButton"
import EditButton from "@/components/Button/EditButton"
import ToggleButton from "@/components/Button/ToggleButton"
import SerachInput from "@/components/Form/SerachInput"
import FormGameModal from "@/components/Modal/FormGameModal"
import { GameType } from "@/utils/type"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {  useState } from "react"

type Props = {
    gamesProvider: [],
    data: GameType[] | null
}

const Table = ({ data, gamesProvider }: Props) => {
    const [modal, setModal] = useState<boolean>(false)
    const [gameEdit, setGameEdit] = useState<GameType | null>(null)
    const [defaultImageUrl, setDefaultImageUrl] = useState<string>("")
    const [games, setGames] = useState<GameType[] | null>(data)
    const router = useRouter()
    const searchParams = useSearchParams()
    const searchParam = searchParams?.get("search") || ""

    const handleClose = () => {
        setModal(false)
        setGameEdit(null)
        setDefaultImageUrl("")
    }
    const updateItem = (id: number) => {
        setGames(prev => {
            if (prev == null) return null
            return prev.filter(game => game.id != id)
        })
    }


    const getData = async ({ searchParam }: { searchParam: string }) => {
        const query = `search=${searchParam}`
        const transactions = await fetch(`/api/game?${query}`, {
            cache: "no-store"
        })
        const data = await transactions.json()

        router.push(`/dashboard/game?${query}`)
        setGames(data)
    }

    return (
        <>
            <div className="pb-4 w-full flex items-center gap-4">
                <SerachInput title="Masukan nama game" fetchData={(text: string) => getData({ searchParam: text })} searchParam={searchParam} />
                <AddButton onClick={() => setModal(true)} />
            </div>
            {
                modal ?
                    <FormGameModal setGames={setGames} handleClose={() => handleClose()} game={gamesProvider} defaultValue={gameEdit} defaultImageUrl={defaultImageUrl} /> : ""
            }
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="uppercase bg-gray-700 text-gray-400 text-xs">
                    <tr>
                        <th scope="col" className=" py-3 w-12">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="py-3 px-3 w-60">
                            Nama
                        </th>
                        <th scope="col" className="py-3">
                            Developer
                        </th>
                        <th scope="col" className="py-3 text-center w-0">
                            Status
                        </th>
                        <th scope="col" className="py-3 text-center w-0">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        games?.map((game, i: number) => {
                            const image = `${process.env.NEXT_PUBLIC_IMAGE_URL}game/${game.image_name}`
                            const dataToggle = {
                                id: game.id
                            }
                            return (
                                <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700" key={i}>
                                    <td className="py-2 px-3">
                                        <div className="relative w-12 h-12">
                                            <Image className="rounded-lg object-cover" fill src={image} alt={`${game.name}`} sizes="3rem" />
                                        </div>
                                    </td>
                                    <td className="py-4 px-3">
                                        {game.name}
                                    </td>
                                    <td className="py-4">
                                        {game.developer}
                                    </td>
                                    <td className="py-4 text-center">
                                        <ToggleButton url="/api/game/status" defaultValue={game.status} data={dataToggle} />
                                    </td>
                                    <td className="py-4 flex items-center gap-4 mt-2 justify-center mr-4 ml-12">
                                        <button className="font-medium text-lg text-blue-500 " title="delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                                        </button>
                                        <EditButton
                                            onClick={() => { setModal(true); setGameEdit(game); setDefaultImageUrl(image) }}
                                        />

                                        <DeleteButton updateItem={() => updateItem(game.id)} id={`${game.id}`} url="/api/game" />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )

}

export default Table