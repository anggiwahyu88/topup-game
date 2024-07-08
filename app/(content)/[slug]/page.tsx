import SubmitButton from "./_component/SubmitButton";
import Wrappper from "./_component/Wrapper";
import DetailUser from "./_component/DetailUser";
import Voucher from "./_component/Voucher";
import Payment from "./_component/Payment";
import Phone from "./_component/PhoneInput";
import Image from "next/image";
import Card from "./_component/Product";
import { selectPayments } from "@/services/payments/select";
import { formatPayments } from "./_libs/formatPayments";
import { filterProduct } from "./_libs/filterProduct";
import { getProduct } from "@/services/api/getProduct";
import { notFound } from "next/navigation";
import { GameType } from "@/utils/type";
import { getGame } from "@/services/api/getGame";

const Page = async ({ params }: { params: { slug: string } }) => {
    const data: GameType | null = await getGame(`eq=path&value=${params.slug}&eq=status&value=true&type=single`)
    if (data == null) {
        return notFound()
    }

    const [products, payments] = await Promise.all([
        getProduct(`game_id=${data.id}`),
        selectPayments("id,name,image_name,fee,payment_category(name)")
    ]);


    const imageGame = `${process.env.NEXT_PUBLIC_IMAGE_URL}game/${data.image_name}`

    const resultPayments = formatPayments(payments)

    const result = filterProduct(products.data);

    return (
        <>
            <div className="border border-white h-36">
            </div>
            <form className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-y-6 lg:gap-x-6">
                <div className="w-full h-min my-shadow rounded-md p-6 text-white">
                    <div className="flex">
                        <div className="relative w-28 h-28" style={{ perspective: "20em" }}>
                            <Image src={imageGame} alt="ml" fill className="object-cover rounded-md my-3d" sizes="7rem" />
                        </div>
                        <div className="w-[calc(100%-7rem)] px-2 flex flex-col justify-center gap-2">
                            <h1 className="text-xl font-semibold tracking-wide text-ellipsis whitespace-nowrap w-full overflow-hidden">{data?.name}</h1>
                            <h2 className="text-sm tracking-wider">{data?.developer}</h2>
                        </div>
                    </div>
                    <div className="mt-4 pt-2 border-top border-white">
                        <p>
                            {data.descripsion}
                        </p>
                    </div>
                </div>
                <div className="col-span-2 grid gap-4">
                    <Wrappper title="Masukkan User ID" no={1} id="detail_user">
                        <DetailUser description_instructions={data.description_instructions} isZoneId={data.zone_id} server={data.server_list} />
                    </Wrappper>
                    <Wrappper title="Pilih Nominal Top Up" no={2} id={"product"}>
                        {
                            result.spesial[0] ?
                                <>
                                    <div>
                                        <span className="font-bold text-sm">Special Item</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4 mb-4" >
                                        {result?.spesial?.map((product, i) => {
                                            return (
                                                product.active ?
                                                    <Card key={i} product={product} game_id={data.id} /> : ""
                                            )
                                        })}
                                    </div>
                                </> : ""
                        }
                        <div>
                            <span className="font-bold text-sm">Top Up Instant</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mt-4" >
                            {result?.normal?.map((product, i) => {
                                return (
                                    product.active ?
                                        <Card key={i} product={product} game_id={data.id} /> : ""
                                )
                            })}
                        </div>
                    </Wrappper>
                    <Wrappper title="Pilih Pembayaran" no={3} id={"payment"}>
                        <div className="grid grid-cols-1 gap-4 mt-4" >
                            {
                                resultPayments?.map((data, i) => {
                                    return (
                                        <Payment
                                            title={data.name}
                                            type={data.type}
                                            key={i}
                                        />
                                    )
                                })
                            }
                        </div>
                    </Wrappper>
                    <Wrappper title="Masukan No WA" no={4} id={"phone"}>
                        <Phone />
                    </Wrappper>
                    <Wrappper title="Masukan Voucher (optional)" no={5} id={"voucher"}>
                        <Voucher />
                    </Wrappper>
                    <SubmitButton isZoneId={data.zone_id} check_id={data.check_id} server={data.server_list} />
                </div>
            </form>
        </>
    )
}

export default Page;