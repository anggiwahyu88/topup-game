"use client"

import UploadButton from "@/components/Button/UploadButton";
import SerachInput from "@/components/Form/SerachInput";
import Pagination from "@/components/Pagination";
import DropDown from "@/components/Form/DropDown";
import Table from "./Table";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoData, ProductType } from "@/utils/type";
import { getProduct } from "@/services/api/getProduct";
import { useState } from "react";

type Props = {
    data: (ProductType & { game_id: number, active: boolean, img_name: string | null })[] | null,
    games: {
        name: string,
        id: string
    }[] | null,
    maxData: number,
    logo: any
};

const ProductDasboard = ({ data, games, maxData, logo }: Props) => {
    const searchParams = useSearchParams()
    const [count, setCount] = useState<number>(maxData)
    const page = Number(searchParams?.get("page") || 1)
    const game_id = searchParams?.get("game_id") || ""
    const searchParam = searchParams?.get("search") || ""
    const [products, setProducts] = useState(data)
    const router = useRouter()

    const getData = async ({ game_id = "0", page = 1, searchParam }: { game_id?: string, page?: number, searchParam: string }) => {
        const query = `search=${searchParam}&page=${page}&game_id=${game_id}`
        const products = await getProduct(query, "client")

        router.push(`/dashboard/product?${query}`)
        setProducts(products.data)
        setCount(products.count)
    }
    const updateLogo = (img_name: string, data: LogoData) => {
        setProducts((prev) => {
            const index = prev?.findIndex((product) => product.name === data.name_product && product.game_id === data.game_id);
            const name = img_name == "none" ? null : img_name
            if (prev && index != undefined) {
                prev[index].img_name = name
            }
            return prev;
        });
    }

    return (
        <>
            <div className="pb-4 w-full flex items-center gap-4">
                <SerachInput fetchData={(text: string) => getData({ searchParam: text })} title="Masukan Nama Product" searchParam={searchParam} />
                <DropDown data={games} logo={"/game.svg"} handleFilterChange={(id: string) => getData({ game_id: id, searchParam })} id={game_id} />
                <UploadButton />
            </div>
            <Table logo={logo} products={products} updateLogo={updateLogo} />
            <Pagination page={page} setPage={(page: number) => getData({ page, game_id, searchParam })} maxData={count || 1} />
        </>
    )
}

export default ProductDasboard;