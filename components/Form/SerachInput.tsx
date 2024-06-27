"use client"

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const SerachInput = ({ fetchData, title, searchParam }: { title: string, fetchData: (text: string) => void, searchParam: string }) => {
    const [search, setSearch] = useState(searchParam);
    const isFirstRender = useRef(true);
    const [value] = useDebounce(search, 1000);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        fetchData(value)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <>
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1 ml-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="table-search"
                    className="py-1 px-2 ps-10 text-sm border rounded-lg w-56 bg-gray-700 text-white border-none focus:outline-primary focus:outline"
                    placeholder={title}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
            </div>
        </>
    );
}

export default SerachInput;