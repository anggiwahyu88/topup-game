import { getAllGames } from "@/utils/supabase/service";
import Table from "./Table";

const Page = async () => {
    const data = await getAllGames("*")

    const api = await fetch("http://localhost:3000/api/game")
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
