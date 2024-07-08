import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { LogoData } from "@/utils/type";


type Props = {
    name_product: string;
    handleClose: () => void;
    logo: any[];
    updateLogo: (img_name: string, data: LogoData) => void;
    devaultImage?: string,
    clearDevaultImage: () => void,
    game_id: number
};

const SelectLogoModal = ({ handleClose, logo, name_product, devaultImage, clearDevaultImage, game_id ,updateLogo}: Props) => {
    const supabase = createClient();
    const [nameLogo, setNameLogo] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = async (name_image: string) => {
        try {
            setLoading(true);
            setNameLogo(name_image);

            const response = await fetch("/api/product/logo", {
                method: "PUT",
                body: JSON.stringify({
                    name_image,
                    name_product,
                    game_id
                })
            })
            const logo_products: {
                error: boolean,
                data: LogoData,
                msg: string
            } = await response.json()

            if (logo_products.error) {
                console.error(logo_products.error);
                return;
            }
            updateLogo(name_image,logo_products.data)
        } catch {

        } finally {
            setLoading(false);
            closeModal();
        }

    };
    const closeModal = () => {
        handleClose()
        clearDevaultImage()
    }

    return (
        <div id="popup-modal" tabIndex={-1} className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full text-white tracking-wide`} style={{ background: "rgba(0, 0, 0, 0.4)" }} >
            <div className="relative w-full max-w-2xl max-h-full left-[50%] top-[50%]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="rounded-lg shadow bg-gray-700 p-4">
                    <div className="bg-gray-800 relative rounded-t p-2">
                        <div className="flex items-center text-lg text-white ">
                            <p>Pilih Logo</p>
                        </div>
                        <button type="button" className="absolute top-1/2 right-[-7px] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center bg-gray-600 text-white" style={{ transform: "translate(0, -50%)" }} onClick={closeModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="flex gap-4 py-4 flex-wrap">
                        {
                            devaultImage ?
                                <div className={`p-1 cursor-pointer transition-transform ${loading ? "cursor-default" : "cursor-pointer hover:scale-110"} ${nameLogo == "none" ? "brightness-75 scale-110 " : ""}`} onClick={() => handleClick("none")}>
                                    <div className="relative h-16 w-16 border-2 border-gray-200 flex items-center justify-center text-gray-200 font-semibold">
                                        <p>none</p>
                                    </div>
                                </div> : ""
                        }
                        {logo.map((data: any, i: number) => {
                            let url;
                            if (data.metadata.size > 0) {
                                url = supabase.storage.from('image').getPublicUrl(`/logo/${data.name}`);
                            }
                            return (
                                <div key={i} className={`${data.metadata.size === 0 ? "hidden" : ""} p-1 transition-transform ${loading || devaultImage == data.name ? "cursor-default" : "cursor-pointer hover:scale-110"} ${data.name === nameLogo ? "brightness-75 scale-110 " : ""} transition-all`} onClick={() => handleClick(data.name)}>
                                    {data.metadata.size > 0 ? (
                                        <button className="h-16 max-w-20 w-auto relative">
                                            {
                                                devaultImage == data.name ?
                                                    <div className="text-xl absolute z-10 text-dark -right-3 -top-2 rounded-full bg-primary w-7 h-7 flex justify-center items-center">
                                                        <p>✓</p>
                                                    </div>
                                                    : ""
                                            }
                                            <Image
                                                alt="logo"
                                                src={url?.data.publicUrl || ""}
                                                width={0}
                                                height={0}
                                                sizes="100%"
                                                style={{ width: 'auto', height: '100%' }}
                                            />
                                        </button>
                                    ) : ""}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectLogoModal;
