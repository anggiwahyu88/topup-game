import { createClient } from "@/utils/supabase/server";

export const count = async (name: string) => {
    const supabase = createClient();
    const { count } = await supabase
        .from(name)
        .select('*', { count: 'exact', head: true })
    return count
}

