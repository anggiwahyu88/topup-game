type Props = {
    handleClose: () => void,
    title: string,
    data: {
        name: string,
        value: string
    }[]
}

const DetailModal = ({ handleClose, title, data }: Props) => {
    return (
        <div id="popup-modal" tabIndex={- 1} className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 w-full h-screen tracking-wide my-2`} style={{ background: "#00000021" }} >
            <div className="relative w-full max-w-2xl max-h-full left-[50%] top-[50%]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="rounded-lg shadow bg-gray-700 ">
                    <div className="bg-gray-800 relative rounded-t p-2">
                        <div className="flex items-center text-lg text-white ">
                            <p>Detail {title}</p>
                        </div>
                        <button type="button" className="absolute top-1/2 right-[-7px] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center bg-gray-600 text-white" onClick={handleClose} style={{ transform: "translate(0, -50%)" }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="w-full p-2 text-white">
                        <ul className="">
                            {data.map((detail,i) => {
                                return (
                                    <li className="px-2 py-2 flex justify-between odd:bg-gray-600 even:bg-none border-b border-gray-500" key={i}>
                                        <span>{detail.name}</span>
                                        <span>{detail.value}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailModal