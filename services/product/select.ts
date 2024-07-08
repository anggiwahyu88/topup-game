import { createClient } from "@/utils/supabase/server";
import { ProductType } from "@/utils/type";

const filterUniqueProduct = (items: ProductType[]) => {
    const nameToItem: { [key: string]: ProductType } = {};
    const nameToCodes: { [key: string]: string[] } = {};

    items.forEach(item => {
        const { name, price, code } = item;
        const maxPrice = Math.max(price.basic, price.premium, price.special);

        if (nameToItem[name]) {
            const existingMaxPrice = Math.max(
                nameToItem[name].price.basic,
                nameToItem[name].price.premium,
                nameToItem[name].price.special
            );
            if (maxPrice > existingMaxPrice) {
                nameToItem[name] = item;
            }
            nameToCodes[name].push(code);
        } else {
            nameToItem[name] = item;
            nameToCodes[name] = [code];
        }
    });

    return Object.values(nameToItem).map(item => {
        const codes = nameToCodes[item.name].join('|');
        return { ...item, code: codes };
    });
};

export const getAllProductProvider = async (game = "") => {
    const formData = new FormData()
    formData.append("key", "30YnvvkgqHfWQUpTeImnZLTffjFRZgK6HLYLAQcdrCyqk8YFMw3Cd0LGQhc1xwgn")
    formData.append("sign", "4b11a2ce1f3a2bf16f8191b47b3b723a")
    formData.append("type", "services")
    formData.append("filter_type", "game")
    formData.append("filter_value", game)
    formData.append("filter_status", "available")
    const response = await fetch("https://vip-reseller.co.id/api/game-feature", {
        method: "POST",
        body: formData,
        cache: "no-store"
    })
    type response = {
        result: boolean,
        data: ProductType[],
        message: string
    }
    const responseData: response = await response.json()
    if (!responseData.result) {
        console.error(responseData.message)
        return null
    }
    const dataFilter = filterUniqueProduct(responseData?.data)

    return dataFilter
}

export const selectProductNonActive = async ({ select, eq, }: { select: string, eq?: [{ name: string, value: any }] }) => {
    const supabase = createClient();
    let query = supabase
        .from("product_nonAktif")
        .select(select as "*")
    if (eq) {
        eq.forEach(item => {
            query.eq(item.name, item.value)
        })
    }
    const { data } = await query;
    return data
}