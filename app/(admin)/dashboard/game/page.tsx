import Table from "./_component/Table";
import { getGame } from "@/services/api/getGame";

const Page = async ({ searchParams }: { searchParams: { search: string } }) => {
    const data = await getGame(`search=${searchParams?.search || ""}`)
    const api = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/game/provider`, {
        next: {
            revalidate: 60
        }
    })
    const games = await api.json()

    return (
        <section className='ml-16 2xl:ml-0'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
                <Table data={data} gamesProvider={games} />
            </div>
        </section>
    );
}

export default Page;
