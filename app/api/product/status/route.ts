import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const { status, name_product, game_id } = await request.json()
    let response    
    if (!status) {
        response = await supabase.from("product_nonAktif").insert({ name_product, game_id })
    } else {
        response = await supabase.from("product_nonAktif").delete().eq("name_product", name_product)
    }
    if (response.error) {
        return NextResponse.json({
            error: true,
            msg: response.error.message
        })
    }
    revalidateTag("product")
    return NextResponse.json({
        error: false,
    })
}
