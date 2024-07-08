import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest, { params }: { params: { order_id: string } }) => {
    const response = await fetch(`https://api.sandbox.midtrans.com/v2/${params.order_id}/status`, {
        headers: {
            'Authorization': `Basic ${btoa(`${process.env.SERVER_KEY}:${""}`)}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    const dataStatus = await response.json()
    return NextResponse.json(dataStatus)
}