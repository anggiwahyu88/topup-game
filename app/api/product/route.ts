import { NextRequest, NextResponse } from "next/server";
import { getAllProductProvider, selectProductNonActive } from "@/services/product/select";
import { getGame } from "@/services/api/getGame";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
    const supabase = createClient();
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page")) || 0;
    const search = url.searchParams.get("search") || "";
    const game_id = Number(url.searchParams.get("game_id") || "");

    type Games = {
        id: number;
        name: string;
        name_provider: string;
    };

    const [games, product, { data: logoData }, productNonActive] = await Promise.all([
        getGame(`select=id, name, name_provider`),
        getAllProductProvider(),
        supabase.from("logo product").select("name_image, name_product, game_id"),
        selectProductNonActive({ select: "name_product" }),
    ])

    const gameMap = new Map(games.map((game:Games) => [game.name_provider, game.id]));
    const nonActiveProductSet = new Set(productNonActive?.map(p => p.name_product));
    const filteredAndMappedProducts = product
        ?.filter(item => gameMap.has(item.game))
        .map(item => {
            const game_id = gameMap.get(item.game) ?? 0;
            const isNonActive = nonActiveProductSet.has(item.name);
            const logoProduct = logoData?.find(image => image.name_product === item.name && image.game_id === game_id);

            return {
                game_id,
                ...item,
                active: !isNonActive,
                img_name: logoProduct?.name_image || null
            };
        })
        .filter(item => {
            if (game_id && search) {
                return item.game_id === game_id && item.name.toLowerCase().includes(search.toLowerCase());
            }
            if (game_id) return item.game_id === game_id;
            if (search) return item.name.toLowerCase().includes(search.toLowerCase());
            return true;
        });

    let result = filteredAndMappedProducts
    if (page) {
        const from = page * 10 - 10;
        const to = page * 10;
        result = filteredAndMappedProducts?.slice(from, to);
    }

    return NextResponse.json({ data: result, games, count: filteredAndMappedProducts?.length || 0 });
}
