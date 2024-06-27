import { getAllProduct } from "@/utils/api/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const response = await getAllProduct()
    const gameNames = new Set();
    response?.forEach(item => {
        gameNames.add(item.game);
    });
    const listGame = Array.from(gameNames);
    return NextResponse.json(listGame)
}
