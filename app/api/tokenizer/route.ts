import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const { id, name, price, phone } = await request.json()
    const parameter = {
        item_details: {
            name,
            price,
            quantity: 1,
            product_id: id
        },
        transaction_details: {
            order_id: ~~(Math.random() * 100) + 1,
            gross_amount: price
        },
        customer_details: {
            phone
        }
    }
    const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
        method: "POST",

        headers: {
            'Authorization': `Basic ${btoa(`${process.env.SERVER_KEY}:${""}`)}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(parameter)
    })
    const data = await response.json()
    if (response.ok) {
        return NextResponse.json(data)
    }
}