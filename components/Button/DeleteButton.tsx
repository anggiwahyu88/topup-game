"use client"

import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = React.ComponentProps<"button"> & {
    id: string;
};

const DeleteButton = ({ id }: Props) => {
    const [modal, setModal] = useState<boolean>(false)
    const router = useRouter()

    const handleDelte = async (id: string) => {
        const respose = await fetch("/api/product", {
            body: JSON.stringify({
                id
            }),
            method: "DELETE",
            cache: 'no-store'
        })
        const data = await respose.json()
        if (data.status == 204) router.refresh()
    }

    return (
        <>
            <Modal handleClose={() => setModal(false)} onModal={modal} />
            <button className="font-medium text-lg text-red-500" onClick={() => setModal(true)} title="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
            </button>
        </>
    );
}

export default DeleteButton;