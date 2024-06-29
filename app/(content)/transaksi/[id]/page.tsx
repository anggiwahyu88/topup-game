import { createClient } from "@/utils/supabase/server";
import Transaksi from "./_component/Transaksi";

const Page = async ({ params }: { params: { id: string } }) => {
    const supabase = createClient()
    const { data } = await supabase.from("transaction").select('*,game(image_name,name),payment(name_provider,fee,name)').eq("order_id", params.id).single()
    const response = await fetch(`https://api.sandbox.midtrans.com/v2/${params.id}/status`, {
        headers: {
            'Authorization': `Basic ${btoa(`${"SB-Mid-server-p5TZQHY6mUJcUlXd0TTvMdLL"}:${""}`)}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    const dataStatus = await response.json()


    return (
        <Transaksi data={data} statusDefault={dataStatus.transaction_status} order_id={params.id}/>
    );
}

export default Page;