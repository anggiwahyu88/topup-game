"use client"

import DetailModal from "@/components/Modal/DetailModal"
import { TransactionType } from "@/utils/type"
import { dateFormat } from "@/utils/dateFormat"
import { useState } from "react"

const Table = ({ transactions }: { transactions: (TransactionType & { game: { name: string }, payment: { name: string } })[] | null }) => {
    const [modal, setModal] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [selectTransaction, setSelctTransaction] = useState<{
        name: string,
        value: string
    }[]>([])

    const handleDetail = (id: string) => {
        if (transactions) {
            const find = transactions.find((value) => value.order_id == id)
            if (find) {
                let item: { name: string, value: string }[] = [];
                if (find.customer_detail.item.username) item = [...item,
                {
                    name: "username",
                    value: find.customer_detail.item.username
                }]
                if (find.customer_detail.item.zone_id) item = [...item,
                {
                    name: "zone id",
                    value: find.customer_detail.item.zone_id
                }
                ]
                if (find.customer_detail.item.server) item = [...item,
                {
                    name: "server",
                    value: find.customer_detail.item.server
                }
                ]
                const formattedDate = dateFormat(new Date(find.created_at))
                const paremter = [
                    {
                        name: "order id",
                        value: id
                    },
                    {
                        name: "transaction id",
                        value: find.transaction_id
                    },
                    {
                        name: "game",
                        value: find.game.name
                    },
                    {
                        name: "product",
                        value: find.customer_detail.item.name
                    },
                    {
                        name: "user id",
                        value: find.customer_detail.item.user_id
                    },
                    ...item,
                    {
                        name: "harga",
                        value: `${find.customer_detail.item.price}`
                    },
                    {
                        name: "phone",
                        value: `${find.customer_detail.phone}`
                    },
                    {
                        name: "Pembayaran",
                        value: find.payment.name
                    },
                    {
                        name: "exp",
                        value: find.exp
                    },
                    {
                        name: "status",
                        value: find.status_transaction
                    },
                    {
                        name: "di buat",
                        value: formattedDate
                    },
                ]
                setSelctTransaction(paremter)
                setTitle(id)
                setModal(true)
            }
        }
    }

    return (
        <>
            {
                modal ? <DetailModal handleClose={() => setModal(false)} title={title} data={selectTransaction} /> : ""
            }

            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="uppercase bg-gray-700 text-gray-400 text-xs">
                    <tr>
                        <th scope="col" className="py-3 px-3 w-0">
                            Order ID
                        </th>
                        <th scope="col" className="py-3 px-3 w-28">
                            No Hp
                        </th>
                        <th scope="col" className="py-3 text-center w-28">
                            Status
                        </th>
                        <th scope="col" className="py-3 text-center w-0">
                            <span className="sr-only">Detail</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions?.map((transaction, i: number) => {
                            return (
                                <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700" key={i}>
                                    <td className="py-4 px-3">
                                        {transaction.order_id}
                                    </td>
                                    <td className="py-4">
                                        {transaction.customer_detail.phone}
                                    </td>
                                    <td className="py-4 text-center">
                                        {transaction.status_transaction}
                                    </td>
                                    <td className="py-4 flex items-center gap-4 mt-2 justify-center mr-4 ml-12">
                                        <button className="font-medium text-lg text-blue-500 " title="detail" onClick={() => handleDetail(transaction.order_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                                        </button>
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