const SerachInput = () => {
    return (
        <>
            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative mt-1 ml-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="table-search" className="py-1 px-2 ps-10 text-sm border rounded-lg w-56 bg-gray-700 text-white border-none focus:outline-primary focus:outline " placeholder="Search for items" />
            </div>
        </>
    );
}

export default SerachInput;