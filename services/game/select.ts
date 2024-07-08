import { createClient } from "@/utils/supabase/server";

type PropsSelectGames = {
    select: string
    search?: string,
    eq?: { name: string, value: any }[]
    single?: boolean
}

type ReturnType<T extends PropsSelectGames> = T["single"] extends true ? any : any[] | null;

export const selectGames = async <T extends PropsSelectGames>(props: T): Promise<ReturnType<T>> => {
    const supabase = createClient();
    let query = supabase
        .from("game")
        .select(props.select as "*")
    if (props.search) query.ilike("name", `%${props.search}%`)
    if (props.eq) {
        props.eq.forEach(item => {
            query.eq(item.name, item.value)
        })
    }
    if (props.single) query.single()
    const { data } = await query;
    return data as ReturnType<T>;
}