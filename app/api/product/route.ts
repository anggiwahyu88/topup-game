import { getAllProduct } from "@/utils/api/service";
import { getGames } from "@/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url)

    const page = Number(url.searchParams.get("page")) || 1
    const search = url.searchParams.get("search") || ""
    const game_id = Number(url.searchParams.get("game_id") || "")
    const games = await getGames({select:"id, name,name_provider"})
    const product = await getAllProduct()
    const gameMap = new Map(games?.map(game => [game.name_provider, game.id]));
    const form = page * 10 - 10
    const to = page * 10 - 1

    const filteredProducts = product?.filter(item => gameMap.has(item.game));
    const result = filteredProducts?.map(item => ({
        game_id: gameMap.get(item.game) ?? 0,
        code: item.code,
        game: item.game,
        name: item.name,
        price: item.price,
        server: item.server,
        status: item.status
    })) || [];

    const filteredResult = result.filter(item => {
        if (game_id) return item.game_id == game_id
        if (result) return item.name.toLowerCase().includes(search.toLowerCase())
        if (result && game_id ) {
            return item.game_id == game_id && item.name.toLowerCase().includes(search.toLowerCase())
        }
    }
    );
    const slicedResult = filteredResult.slice(form, to);

    return NextResponse.json({ data: slicedResult, games: games, count: filteredResult.length });
}