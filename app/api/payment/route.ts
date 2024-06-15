import { NextRequest, NextResponse } from "next/server"
import { qris, transfer_bank } from "./request"
import { createClient } from "@/utils/supabase/server";
import { generateTransactionNumber } from "@/utils/getOrderID";

export async function POST(request: NextRequest) {
    const { item, phone, game_id, payment_id, } = await request.json()
    const supabase = createClient()
    const { data: gameData, error: gameError } = await supabase
        .from("game")
        .select("name")
        .eq("id", game_id)
        .single();

    const { data: paymentData, error: paymentError } = await supabase
        .from("payment")
        .select("name_provider")
        .eq("id", payment_id)
        .single();

    if (gameError || paymentError || !gameData?.name || !paymentData?.name_provider) {
        return NextResponse.json({
            error: true,
            msg: "invalid Input",
        });
    }

    const order_id = generateTransactionNumber(gameData.name, phone)
    const parameter = {
        item_details: {
            name: item.name,
            price: item.price,
            quantity: 1,
            product_id: item.id
        },
        transaction_details: {
            order_id: order_id,
            gross_amount: item.price
        },
        customer_details: {
            phone,
        }
    }

    let data
    if (paymentData.name_provider == "qris") {
        data = await qris(parameter)
    }
    else if (paymentData.name_provider == "bni" || paymentData.name_provider == "bri" || paymentData.name_provider == "cimb" || paymentData.name_provider == "permata" || paymentData.name_provider == "bca") {
        data = await transfer_bank(parameter, paymentData.name_provider)
    }
    else {
        return NextResponse.json({
            error: true,
            msg: "invild payment"
        })
    }

    if ('error' in data) {
        return NextResponse.json(data)
    }

    const { error } = await supabase
        .from('transaction')
        .insert({
            order_id,
            game_id,
            payment_id,
            customer_detail: {
                phone,
                item
            },
            transaction_id: data.transaction_id,
            exp: data.exp,
            action: data.actions
        })
    if (error) {
        return NextResponse.json({
            error: true
        })
    }
    return NextResponse.json({
        error: false,
        message: data?.status_message,
        order_id
    })
}