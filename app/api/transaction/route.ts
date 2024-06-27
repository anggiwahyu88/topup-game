import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url)

    const page = Number(url.searchParams.get("page")) || 1
    const search = url.searchParams.get("search") || ""
    const game_id = Number(url.searchParams.get("game_id") || "")
    const status = url.searchParams.get("status") || ""
    const form = page * 10 - 10
    const to = page * 10 -1
    
    const supabase = createClient()
    let query = supabase
        .from("transaction")
        .select('*,payment(name),game(name)', { count: "exact" })
        .range(form, to)

    if (search) {
        query = query.like("order_id", `%${search}%`)
    }
    if (game_id) {
        query = query.eq("game_id", game_id);
    }
    if (status == "pending" || status == "settlement" || status == "expire") {
        query = query.eq("status_transaction", status);
    }    
    const { data, count } = await query

    return NextResponse.json({ data, count })
}