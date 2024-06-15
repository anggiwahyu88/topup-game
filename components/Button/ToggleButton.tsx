"use client"

import { useEffect, useState } from "react";

const ToggleButton = ({ defaultValue = false, url, data }: { defaultValue?: boolean, url: string, data: any}) => {
    const [isActive, setIsActive] = useState<boolean>(defaultValue)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsActive(defaultValue)
    }, [defaultValue])

    const handeleChange = async () => {
        setIsActive((prev) => !prev)

        setLoading(true)
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                ...data,
                status: !isActive
            }),
            cache: "no-cache"
        })
        const responseJson = await response.json()
        if (responseJson.error) {
            setIsActive((prev) => !prev)
        }
        setLoading(false)
    }

    return (
        <label className={`inline-flex items-center mx-auto ${loading ? "" : "cursor-pointer"}`}>
            <input type="checkbox" value="" className="sr-only peer" disabled={loading} checked={isActive} onChange={handeleChange} />
            <div className="relative w-9 h-5 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium">{isActive ? "Aktif" : "NonAktif"}</span>
        </label>
    );
}

export default ToggleButton;