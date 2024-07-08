import { NextRequest, NextResponse } from "next/server";
import { getAllProductProvider } from "@/services/product/select";

export async function GET(request: NextRequest) {
    const response = await getAllProductProvider()
    const gameNames = new Set();
    response?.forEach(item => {
        gameNames.add(item.game);
    });
    const listGame = Array.from(gameNames);
    return NextResponse.json(listGame)
}
