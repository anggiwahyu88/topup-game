import { createClient } from "@/utils/supabase/server";
import Table from "./_component/Table";

const Page = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("voucher").select("*")

    return (
        <div className="pp ml-16">
            <section >
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
                    <Table data={data} />
                </div>
            </section>
        </div>
    );
}

export default Page;