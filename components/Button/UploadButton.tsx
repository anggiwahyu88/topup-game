"use client"

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UploadButton = () => {
    const [image, setImage] = useState<File>()

    const uploadImage = useCallback(async () => {
        const formData = new FormData();
        formData.append('image', image || "");
        const response = await fetch("/api/product/logo", {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        setImage(undefined)
        if (!data.isValid) return toast.error(data?.msg)
        return toast.success("upload succses")
    }, [image])

    useEffect(() => {
        if (image) {
            uploadImage()
        }
    }, [image, uploadImage])

    return (
        <form className="relative ml-auto mr-4">
            <label title="Click to upload" htmlFor="button2" className="cursor-pointer flex items-center gap-2 px-2.5 py-1 group before:bg-primary before:absolute before:inset-0 before:rounded-xl before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
                <div className="w-max relative text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H80a8,8,0,0,1,0,16H32v64H224V136H176a8,8,0,0,1,0-16h48A16,16,0,0,1,240,136ZM85.66,77.66,120,43.31V128a8,8,0,0,0,16,0V43.31l34.34,34.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,77.66ZM200,168a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z"></path></svg>
                </div>
                <div className="relative">
                    <span className="block text-sm font-semibold relative text-dark">
                        Upload Logo
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-700">Max 2 MB</span>
                </div>
            </label>
            <input hidden type="file" name="button2" id="button2" accept="image/*" onChange={(e) => setImage(e?.target?.files?.[0])} />
        </form>
    );
}

export default UploadButton;