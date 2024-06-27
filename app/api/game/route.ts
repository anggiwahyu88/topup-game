import { getAllGames } from "@/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const search = request.nextUrl.searchParams?.get("search") || ""    
    const games = await getAllGames("*", search)
    return NextResponse.json(games)
}