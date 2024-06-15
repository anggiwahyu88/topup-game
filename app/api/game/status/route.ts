import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const { status, id } = await request.json()

    const { error } = await supabase.from("game").update({ status }).eq("id", id)
    if (error) {
        return NextResponse.json({
            isValid: false,
            msg: error.message
        })
    }
    return NextResponse.json({
        isValid: true
    })
}
