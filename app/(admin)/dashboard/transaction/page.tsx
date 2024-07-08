import { getGame } from "@/services/api/getGame";
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
    const query = `search=${searchParams?.search || ""}&page=${searchParams?.page || ""}&game=${searchParams?.game_id || ""}&status=${searchParams?.status || ""}`
    const [transactions, games] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/transaction?${query}`, {
            cache: "no-store"
        }),
        getGame(`select=id,name`)
    ])
    const dataTransaction = await transactions.json()

    return (
        <section className='ml-16 2xl:ml-0'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
                <TransactionDashboard data={dataTransaction} games={games} />
            </div>
        </section>
    );
}

export default Page;
