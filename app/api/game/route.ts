import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { selectGames } from "@/services/game/select";

export async function GET(request: NextRequest) {
    try {

        const search = request.nextUrl.searchParams?.get("search") || ""
        const select = request.nextUrl.searchParams?.get("select") || "*"
        const eq = request.nextUrl.searchParams?.getAll("eq") || ""
        const value = request.nextUrl.searchParams?.getAll("value") || ""
        const type = request.nextUrl.searchParams?.get("type") || ""
        const single = type == "single" ? true : false

        if (eq && value) {
            const parameterEq = []
            for (let i = 0; i < eq.length; i++) {
                parameterEq.push({ name: eq[i], value: value[i] })
            }

            const games = await selectGames({ select, search, eq: parameterEq, single })
            return NextResponse.json(games)
        }
        const games = await selectGames({ select, search, single })
        return NextResponse.json(games)
    }
    catch{
        return NextResponse.json({ error: "error" })
    }
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json()
    const supabase = createClient()
    const { data, error } = await supabase.from("game").delete().eq("id", id).select("name").single()
    return NextResponse.json({ error, msg: `${data?.name} berhasil dihapus` })
}