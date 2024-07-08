"use client"

import FormGameModal from "@/components/Modal/FormGameModal"
import ToggleButton from "@/components/Button/ToggleButton"
import DeleteButton from "@/components/Button/DeleteButton"
import SerachInput from "@/components/Form/SerachInput"
import EditButton from "@/components/Button/EditButton"
import AddButton from "@/components/Button/AddButton"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { GameType } from "@/utils/type"
import { getGame } from "@/services/api/getGame"

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
        const data = await getGame(query,'client')
        
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
                                        <EditButton
                                            onClick={() => { setModal(true); setGameEdit(game); setDefaultImageUrl(image) }}
                                        />
                                        <DeleteButton name={`game ${game.name}`} updateItem={() => updateItem(game.id)} id={`${game.id}`} url="/api/game" />
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