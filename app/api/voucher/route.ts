import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const { id } = await request.json()
    const supabase = createClient()
    const { data, error } = await supabase.from("voucher").delete().eq("id", id).select("code").single()
    return NextResponse.json({ error, msg: `voucher ${data?.code} berhasil dihapus` })
}

export async function POST(request: NextRequest) {
    const { code, price } = await request.json()
    const supabase = createClient()
    const { data, error } = await supabase.from("voucher").select("*").eq("code", code).single()
    if (!data || error) return NextResponse.json({ error: "voucher tidak ditemukan" })
    if (data.exp && (data?.exp < new Date())) return NextResponse.json({ error: "voucher sudah expired" })
    if (data.max_usage == 0) {
        return NextResponse.json({ error: "voucher sudah habis" })
    }
    if (data.min_spen > price) {
        return NextResponse.json({ error: "minimal pembelian belum terpenuhi" })
    }
    const percentage = parseFloat(`${data.discount}%`) / 100;

    let discount = Math.floor(price * percentage);
    let newPrice = price - discount

    if (data.max_dicont && (data.max_dicont <= discount)) {
        newPrice = price - data.max_dicont
        discount = data.max_dicont
    }

    if (data.max_usage >= 1) {
        const { error: updateError } = await supabase.from("voucher").update({ max_usage: data.max_usage - 1 }).eq("id", data.id).select().single()
        if (updateError) return NextResponse.json({ error: updateError.message })
    }

    return NextResponse.json({ error: null, newPrice, discount })
}