"use client"

import UploadButton from "@/components/Button/UploadButton";
import SerachInput from "@/components/Form/SerachInput";
import Pagination from "@/components/Pagination";
import DropDown from "../DropDown";
import { Children, cloneElement, isValidElement, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductType } from "@/utils/type";

type Props = {
    data: ProductType[] | null,
    games: {
        name: string,
        id: string
    }[] | null,
    maxData: number,
    children: React.ReactNode
};

const ProductDasboard = ({ children, data, games, maxData }: Props) => {
    const searchParams = useSearchParams()
    const [count, setCount] = useState<number>(maxData)
    const page = Number(searchParams?.get("page") || 1)
    const game_id = searchParams?.get("game_id") || ""
    const searchParam = searchParams?.get("search") || ""
    const [products, setProducts] = useState(data)
    const router = useRouter()

    const getData = async ({ game_id = "0", page = 1, searchParam }: { game_id?: string, page?: number, searchParam: string }) => {
        const query = `search=${searchParam}&page=${page}&game_id=${game_id}`
        const transactions = await fetch(`/api/product?${query}`, {
            cache: "no-store"
        })
        const data = await transactions.json()

        router.push(`/dashboard/product?${query}`)
        setProducts(data.data)
        setCount(data.count)
    }
    return (
        <>

            <div className="pb-4 w-full flex items-center gap-4">
                <SerachInput fetchData={(text: string) => getData({ searchParam: text })} title="Msukan Nama Product" searchParam={searchParam} />
                <DropDown data={games} logo={"/game.svg"} handleFilterChange={(id: string) => getData({ game_id: id, searchParam })} id={game_id} />
                <UploadButton />
            </div>
            {Children.map(children, child => {
                if (isValidElement<Partial<{ products: ProductType[] | null }>>(child)) {
                    return cloneElement(child, { products });
                }
                return child;
            })}
            <Pagination page={page} setPage={(page: number) => getData({ page, game_id, searchParam })} maxData={count || 1} />
        </>
    )
}

export default ProductDasboard;