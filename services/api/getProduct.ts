export const getProduct = async (query: string, type: "server" | "client" = "server") => {
    let url
    if (type == "server") url = `${process.env.NEXT_PUBLIC_URL}/api/product?${query}`
    else url = `/api/product?${query}`
    const response = await fetch(url, {
        next: {
            tags: ["product"],
            revalidate: 3600
        }
    })
    if (!response.ok) {
        return null
    }
    const data = await response.json()    
    return data
}