import { createClient } from "@/utils/supabase/server";
import Table from "./_component/Table";

const Page = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("voucher").select("*")

    return (
        <section className='ml-16 2xl:ml-0'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
                <Table data={data} />
            </div>
        </section>
    );
}

export default Page;