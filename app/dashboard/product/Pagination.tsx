"use client"

type Props = {
    maxData: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ maxData, page, setPage }: Props) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(maxData / 20); i++) {
        pageNumbers.push(i);
    }
    const lastPage = pageNumbers[pageNumbers.length - 1];

    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing <span className="font-semibold text-white">{`${(page - 1) * 20 + 1} - ${page == lastPage ? `${maxData}` : `${page * 20}`}`}</span> of <span className="font-semibold text-white">{maxData}</span>
            </span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                {
                    page != 1 ?
                        <li>
                            <button disabled={page == 1} onClick={() => setPage((prev) => prev - 1)} className=" text-gra flex items-center justify-center px-3 h-8 ms-0 leading-tight border rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                Previous
                            </button>
                        </li>
                        : ""
                }
                {
                    page > 3 ?
                        <li>
                            <button onClick={() => setPage(1)} className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-700 ${1 == page ? " bg-gray-700 text-white cursor-default" : "text-gray-400 hover:bg-gray-700 hover:text-white  bg-gray-800"}`}>
                                {1}
                            </button>
                        </li>
                        : ""
                }
                {
                    page > 4 ?
                        <li>
                            <div className="h-8 px-3">
                                <p className="pt-2 text-white tracking-widest">...</p>
                            </div>
                        </li>
                        : ""
                }
                {pageNumbers.map((value, i) => {
                    if (page - value == -2 || page - value == -1 || page - value == 0 || page - value == 1 || page - value == 2) {
                        return (
                            <li key={i}>
                                <button disabled={page == value} onClick={() => setPage(value - page + page)} className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-700 ${value == page ? " bg-gray-700 text-white cursor-default" : "text-gray-400 hover:bg-gray-700 hover:text-white  bg-gray-800"}`}>
                                    {value}
                                </button>
                            </li>
                        )
                    }
                })}
                {
                    lastPage - page > 3 ?
                        <li>
                            <div className="h-8 px-3">
                                <p className="pt-2 text-white tracking-widest">...</p>
                            </div>
                        </li>
                        : ""
                }
                {
                    lastPage - page > 2 ?

                        <li>
                            <button onClick={() => setPage(lastPage)} className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-700 ${lastPage == page ? " bg-gray-700 text-white cursor-default" : "text-gray-400 hover:bg-gray-700 hover:text-white  bg-gray-800"}`}>
                                {lastPage}
                            </button>
                        </li> : ""
                }
                {
                    page != lastPage ?
                        <li>
                            <button disabled={page == lastPage} onClick={() => setPage((prev) => prev + 1)} className=" flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                Next
                            </button>
                        </li> : ""
                }
            </ul>
        </nav>
    );
}

export default Pagination;