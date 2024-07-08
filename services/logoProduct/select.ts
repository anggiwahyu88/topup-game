import { createClient } from "@/utils/supabase/server";

export const selectLogoProduct = async ({ select, eq}: { select: string, eq?: [{ name: string, value: any }]}) => {

    const supabase = createClient();
    let query = supabase
        .from("product_nonAktif")
        .select(select as "*")
    if (eq) {
        eq.forEach(item => {
            query.eq(item.name, item.value)
        })
    }
    const { data } = await query;
    return data
}