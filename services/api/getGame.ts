export const getGame = async (query: string, type: "server" | "client" = "server") => {
    let url
    if (type == "server") url = `${process.env.NEXT_PUBLIC_URL}/api/game?${query}`
    else url = `/api/game?${query}`
    const response = await fetch(url, {
        next: {
            tags: ["game"],
            revalidate: 3600
        }
    })
    if (!response.ok) {
        return null
    }
    const data = await response.json()
    return data
}