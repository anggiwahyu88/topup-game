import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { transaction_status, order_id } = await request.json()
    if (transaction_status != "settlement" && transaction_status != "expire") {
        return NextResponse.json("ok")
    }
    const supabase = createClient()
    const { data } = await supabase.from("transaction").update({ status_transaction: transaction_status }).eq("order_id",order_id).select()
    
    return NextResponse.json(data)
}