import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { code, user_id, zone_id } = await request.json()
    const formData = new FormData()
    formData.append("key", "30YnvvkgqHfWQUpTeImnZLTffjFRZgK6HLYLAQcdrCyqk8YFMw3Cd0LGQhc1xwgn")
    formData.append("sign", "4b11a2ce1f3a2bf16f8191b47b3b723a")
    formData.append("type", "get-nickname")
    formData.append("code", code)
    formData.append("target", user_id)
    formData.append("additional_target", zone_id)
    const response = await fetch("https://vip-reseller.co.id/api/game-feature", {
        method: "POST",
        body: formData
    })
    const data = await response.json()
    if (!data.result) {
        return NextResponse.json({
            message: data.message,
            result: data.result
        })
    }
    return NextResponse.json(data)
}
