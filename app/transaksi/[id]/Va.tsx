"use client"

const Va = ({code}:{code:string}) => {
    const copy = () => {
        navigator.clipboard.writeText(code)
    }
    return (
        <div className="w-full lg:pr-4">
            <div className="border border-white flex justify-between px-4 py-2 rounded-xl">
                <div className="font-bold text-lg">
                    <p>Nomor Virtual Account</p>
                    <p className="text-primary">{code}</p>
                </div>
                <div className="flex items-center">
                    <button title="copy" onClick={copy} className="text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg></button>
                </div>
            </div>
        </div>
    );
}

export default Va;