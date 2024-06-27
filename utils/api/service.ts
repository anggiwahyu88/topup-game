import { filterUniqueProduct } from "../filterUniqeProduct"
import { ProductType } from "../type"

export const getAllProduct = async (game = "") => {
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