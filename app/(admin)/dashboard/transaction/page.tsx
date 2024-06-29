import { getGames } from "@/utils/supabase/service";
import TransactionDashboard from "./_component/TransactionDashboard";

type Props = {
    searchParams: {
        search: string,
        page: string,
        game_id: string,
        status: string
    }
}

const Page = async ({ searchParams }: Props) => {
    const query = `search=${searchParams?.search || ""}&page=${searchParams?.page || ""}&game=${searchParams?.game_id || ""}&status=${searchParams?.status}`
    const [transactions, games] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/transaction?${query}`, {
            cache: "no-store"
        }),
        getGames({ select: "id,name" })
    ])
    const data = await transactions.json()

    return (
        <div className="pp ml-16">
            <section >
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
                    <TransactionDashboard data={data} games={games} />
                </div>
            </section>
        </div>
    );
}

export default Page;
