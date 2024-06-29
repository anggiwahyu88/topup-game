import { NextRequest, NextResponse } from "next/server";
import {  getGames } from "@/utils/supabase/service";

export async function GET(request: NextRequest) {
    const search = request.nextUrl.searchParams?.get("search") || ""    
    const games = await getGames({select:"*", search })
    return NextResponse.json(games)
}