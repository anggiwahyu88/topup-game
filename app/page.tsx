import Collapse from "@/components/Collapse"
import Card from "@/components/Card"
import Link from "next/link"
import { getGame } from "@/services/api/getGame"

type Game = {
    name: string
    developer: string
    image_name: string
    path: string
}

const Page = async () => {
    const data: Game[] = await getGame(`select=name, developer,image_name,path&eq=status&value=true`)

    return (
        <>
            <section className="">
                <h1 className="text-white text-xl font-semibold tracking-wide mb-4">🔥 POPULER</h1>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 w-full">
                    <Collapse />
                    <Collapse />
                    <Collapse />
                    <Collapse />
                    <Collapse />
                    <Collapse />
                    <Collapse />
                </div>
            </section>
            <section className="">
                <div className="w-full p mb-6 py-4">
                    <Link href={"#"} className="text-white text-lg y py-4">Game Top Up</Link>
                </div>
                <div className="flex items-center justify-start flex-wrap gap-y-4 gap-x-2">
                    {data?.map((game, i: number) => {
                        const image_url = `${process.env.NEXT_PUBLIC_IMAGE_URL}game/${game.image_name}`
                        return (
                            <Card key={i} name={game.name} developer={game.developer} href={`/${game.path}`} image_url={image_url} />
                        )
                    })}
                </div>
            </section>
        </>
    );
}

export default Page;