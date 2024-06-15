import { NextRequest, NextResponse } from "next/server"
import { getGameByPath } from "@/utils/supabase/service"

export async function GET(request: NextRequest, { params }: { params: { path: string } }) {
    const response = await getGameByPath(params.path, "*")
    return NextResponse.json(response)
}