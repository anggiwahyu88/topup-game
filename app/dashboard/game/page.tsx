import DeleteButton from "@/components/Button/DeleteButton";
import Image from "next/image";
import { getAllGames, getURLImage } from "@/utils/supabase/service";
import EditButton from "@/components/Button/EditButton";
import { Game } from "@/utils/type";
import ToggleButton from "@/components/Button/ToggleButton";
import Heading from "./Heading";

const Page = async () => {
    const data = await getAllGames("*")

    const api = await fetch("http://localhost:3000/api/game")
    const games = await api.json()

    return (
        <div className="pp">
            <section >
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
                    <Heading game={games} />
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
                                data?.map((game: Game, i: number) => {
                                    const image = getURLImage(`game/${game.image_name}`)
                                    const dataToggle = {
                                        id: game.id
                                    }
                                    return (
                                        <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700" key={i}>
                                            <td className="py-2 px-3">
                                                <div className="relative w-12 h-12">
                                                    <Image className="rounded-lg object-cover" fill src={image.publicUrl} alt={`${game.name}`} sizes="3rem" />
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
                                                <EditButton game={games} defaultValue={game} defaultImageUrl={image.publicUrl} />
                                                <DeleteButton id={`${game.id}`} />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Page;
