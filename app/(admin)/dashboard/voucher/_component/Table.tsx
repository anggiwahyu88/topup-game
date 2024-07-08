"use client"

import DeleteButton from "@/components/Button/DeleteButton"
import VoucherModal from "@/components/Modal/VoucherModal"
import EditButton from "@/components/Button/EditButton"
import AddButton from "@/components/Button/AddButton"
import { VoucherType } from "@/utils/type"
import { useState } from "react"

type Props = {
    data: VoucherType[] | null
}

const Table = ({ data }: Props) => {
    const [modal, setModal] = useState<boolean>(false)
    const [vouvherEdit, setVoucherEdit] = useState<VoucherType | null>(null)
    const [vouchers, setVouchers] = useState<VoucherType[] | null>(data)

    const deleteVoucher = (id: number) => {
        setVouchers(prev => {
            if (prev == null) return null
            return prev.filter(voucher => voucher.id != id)
        })
    }

    const closeModal = () => {
        setModal(false)
        setVoucherEdit(null)
    }

    return (
        <>
            <div className="w-full mb-4 pr-2">
                <AddButton onClick={() => setModal(true)} className="ml-auto" />
            </div>
            {
                modal ?
                    <VoucherModal handleClose={() => closeModal()} defaultValue={vouvherEdit} setVoucers={setVouchers} /> : ""
            }
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="uppercase bg-gray-700 text-gray-400 text-xs">
                    <tr>
                        <th scope="col" className="py-3 px-2">
                            Code
                        </th>
                        <th scope="col" className="py-3">
                            Maximal Penggunaan
                        </th>
                        <th scope="col" className="py-3">
                            Expired
                        </th>
                        <th scope="col" className="py-3 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vouchers?.map((voucher, i: number) => {
                            return (
                                <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700" key={i}>
                                    <td className="py-4 px-2">
                                        {voucher.code}
                                    </td>
                                    <td className="py-4">
                                        {voucher?.max_usage || "-"}
                                    </td>
                                    <td className="py-4">
                                        {voucher?.exp?.toDateString() || "-"}
                                    </td>
                                    <td className="py-4 flex items-center gap-4 mt-2 justify-center mr-4 ml-12">
                                        <EditButton
                                            onClick={() => { setModal(true); setVoucherEdit(voucher) }}
                                        />
                                        <DeleteButton id={`${voucher.id}`} url="/api/voucher" updateItem={() => deleteVoucher(voucher.id)} name={`voucher ${voucher.code}`} />
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