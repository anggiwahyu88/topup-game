import { createClient } from "@/utils/supabase/server";
import Form from "./_component/Form";

const Page = async() => {
    const supabase = createClient()
    const { data } = await supabase.from("price").select("vip,reseller,basic").single()
    return (
        <section className="pp ml-16">
            <div className="text-center mb-4 text-white text-xl font-semibold tracking-wide">
                <h1>Kustom Harga</h1>
            </div>
            <div className="flex justify-center items-center w-full">
                <Form defaultValue={data}/>
            </div>
        </section>
    );
}

export default Page;