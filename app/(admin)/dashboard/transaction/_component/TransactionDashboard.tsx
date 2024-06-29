"use client"

import SerachInput from "@/components/Form/SerachInput"
import Pagination from "@/components/Pagination"
import DropDown from "@/components/Form/DropDown"
import Table from "./Table"
import { useRouter, useSearchParams } from "next/navigation"
import { TransactionType } from "@/utils/type"
import { useState } from "react"

type Props = {
    data: {
        data: (TransactionType & { game: { name: string }, payment: { name: string } })[] | null,
        count: number
    },
    games: { name: string, id: string }[] | null,
}

const TransactionDashboard = ({ data, games }: Props) => {
    const [transactions, setTransactions] = useState(data.data || [])
    const [count, setCount] = useState<number>(data.count)
    const searchParams = useSearchParams()
    const router = useRouter()
    const searchParam = searchParams?.get("search") || ""
    const game_id = searchParams?.get("game_id") || ""
    const status = searchParams?.get("status") || ""
    const page = Number(searchParams.get("page") || 1)
    const dataStatus = [
        {
            name: "Pending",
            id: "pending"
        },
        {
            name: "Settlement",
            id: "settlement"
        },
        {
            name: "Expire",
            id: "expire"
        }
    ]

    const getData = async ({ status = "all", game_id = "0", page = 1, searchParam }: { game_id?: string, status?: string, page?: number, searchParam: string }) => {
        const query = `search=${searchParam}&page=${page}&game_id=${game_id}&status=${status}`
        const transactions = await fetch(`/api/transaction?${query}`, {
            cache: "no-store"
        })
        const data = await transactions.json()
        router.push(`/dashboard/transaction?${query}`)
        setTransactions(data.data)
        setCount(data.count)
    }

    return (
        <>
            <div className="pb-4 w-full flex items-center gap-4">
                <SerachInput fetchData={(text: string) => getData({ searchParam: text })} searchParam={searchParam} title="Masukan Order Id" />
                <DropDown logo={"/game.svg"} data={games} handleFilterChange={(id: string) => getData({ game_id: id, searchParam, status })} id={game_id} />
                <DropDown logo={"/status.svg"} data={dataStatus} handleFilterChange={(id: string) => getData({ game_id, searchParam, status: id })} id={status} />
            </div>
            <Table transactions={transactions} />
            <Pagination page={page} setPage={(page: number) => getData({ page, game_id, searchParam, status })} maxData={count || 0} />
        </>
    )
}

export default TransactionDashboard;