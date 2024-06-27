import Table from "./Table";

const Page = async ({ searchParams }: { searchParams: { search: string } }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/game?search=${searchParams?.search || ""}`)
    const data = await response.json()

    const api = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/game/provider`)
    const games = await api.json()

    return (
        <div className="pp ml-16">
            <section >
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
                    <Table data={data} gamesProvider={games} />
                </div>
            </section>
        </div>
    );
}

export default Page;
