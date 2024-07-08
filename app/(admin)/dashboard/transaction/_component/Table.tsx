"use client"

import DetailButton from "@/components/Button/DetailButton"
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
                                        <DetailButton onClick={() => handleDetail(transaction.order_id)} />
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