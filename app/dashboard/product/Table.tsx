"use client"

import SelectLogoModal from "@/components/Modal/SelectLogoModal";
import ToggleButton from "@/components/Button/ToggleButton";
import AddButton from "@/components/Button/AddButton";
import Image from "next/image";
import { LogoData, ProductType } from "@/utils/type";
import { useState } from "react";
import Pagination from "./Pagination";
import SerachInput from "@/components/Form/SerachInput";
import DropDown from "../drop-down";
import UploadButton from "@/components/Button/UploadButton";

type Props = {
    defaultImageLogo: LogoData[] | null,
    logo: any,
    data: ProductType[] | null,
    product_nonAktif: {
        product_name: string
    }[] | null,
    games: {
        name: string,
        id: number
    }[] | null
};

const Table = ({ logo, defaultImageLogo, data, product_nonAktif, games }: Props) => {
    const [modal, setModal] = useState({
        name_product: "",
        game_id: 0,
        onModal: false
    });
    const [imageLogo, setImageLogo] = useState<LogoData[] | null>(defaultImageLogo);
    const [defaultImage, setDefaultImage] = useState<string>("");
    const [page, setPage] = useState<number>(1)
    const indexOfLastItem = page * 20;
    const indexOfFirstItem = indexOfLastItem - 20;
    const [products, setProducts] = useState(data)
    const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);

    const handleFilter = (id: number) => {
        if (id != 0) {
            const dataFilter = data?.filter((product) => product.game_id == id) || null
            setProducts(dataFilter)
        } else {
            setProducts(data)
        }
    }

    return (
        <>
            {modal.onModal ?
                <SelectLogoModal name_product={modal.name_product} handleClose={() => setModal({ name_product: "", onModal: false, game_id: 0 })} logo={logo} game_id={modal.game_id} setImageLogo={setImageLogo} devaultImage={defaultImage} clearDevaultImage={() => setDefaultImage("")} />
                : ""}
            <div className="pb-4 w-full flex items-center gap-4">
                <SerachInput />
                <DropDown games={games} handleFilter={handleFilter} resetPage={() => setPage(1)} />
                <UploadButton />
            </div>            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="uppercase bg-gray-700 text-gray-400 text-xs">
                    <tr>
                        <th scope="col" className="px-2 py-3 text-center w-28">
                            Logo
                        </th>
                        <th scope="col" className="py-3 px-3 w-60">
                            Nama
                        </th>
                        <th scope="col" className="py-3 px-3">
                            Game
                        </th>
                        <th scope="col" className="py-3 px-3 text-center w-0">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems?.map((product, i: number) => {
                            const dataToggle = {
                                name_product: product.name,
                                game_id: product.game_id
                            }

                            const isProduct_nonAktif = product_nonAktif?.find((value) => value.product_name == product.name) || null
                            const defaultValueToggle = isProduct_nonAktif ? false : true

                            let url
                            const logoProduct = imageLogo?.find((image) => image.name_product === product.name)

                            if (product.name == logoProduct?.name_product) {
                                url = `${process.env.NEXT_PUBLIC_IMAGE_URL}logo/${logoProduct.name_image}`
                            }
                            return (
                                <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700" key={i}>
                                    <td className="py-2 px-3 text-center">
                                        {
                                            url ?
                                                <div className="flex justify-center h-10 max-w-20 w-auto">
                                                    <button onClick={() => {
                                                        setDefaultImage(logoProduct?.name_image || "");
                                                        setModal({
                                                            game_id: product.game_id,
                                                            name_product: product.name,
                                                            onModal: true
                                                        })
                                                    }
                                                    }>
                                                        <Image
                                                            alt="logo"
                                                            src={url}
                                                            width={0}
                                                            height={0}
                                                            sizes="100%"
                                                            style={{ width: 'auto', height: '100%' }}
                                                        />
                                                    </button>
                                                </div>
                                                :
                                                <AddButton onClick={() => setModal({
                                                    name_product: product.name,
                                                    game_id: product.game_id,
                                                    onModal: true
                                                })} />
                                        }
                                    </td>
                                    <td className="py-4 px-3">
                                        {product.name}
                                    </td>
                                    <td className="py-4 px-3">
                                        {product.game}
                                    </td>
                                    <td className="py-4 px-3 text-center">
                                        <ToggleButton defaultValue={defaultValueToggle} data={dataToggle} url="/api/product/status" />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} maxData={products?.length || 0} />
        </>
    );
}

export default Table;