import { createClient } from "@/utils/supabase/server";

export const selectTransaction = async (select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("transaction")
        .select(select as "*")
    return data
}