import DetailTransaksi from "./_component/DetailTransaksi";
import { createClient } from "@/utils/supabase/server";

const Page = async ({ params }: { params: { id: string } }) => {
    const supabase = createClient()
    const [{ data }, response] = await Promise.all([
        supabase.from("transaction").select('*,game(image_name,name),payment(name_provider,fee,name)').eq("order_id", params.id).single(),
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/transaction/status/${params.id}`)
    ])
    const dataStatus = await response.json()

    return (
        <DetailTransaksi data={data} statusDefault={dataStatus.transaction_status} order_id={params.id} />
    );
}

export default Page;