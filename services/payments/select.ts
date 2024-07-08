import { createClient } from "@/utils/supabase/server";

export const selectPayments = async (select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("payment")
        .select(select as "*")
        .eq("status", true);

    return data
}