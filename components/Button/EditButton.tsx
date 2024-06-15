"use client"

import { useState } from "react";
import FormGameModal from "../Modal/FormGameModal";
import { Game } from "@/utils/type";

type pros = {
    game: [],
    defaultValue: Game,
    defaultImageUrl: string
}

const EditButton = ({ game, defaultValue, defaultImageUrl }: pros) => {
    const [modal, setModal] = useState<boolean>(false)

    return (
        <>
            {modal ?
                <FormGameModal handleClose={() => setModal(false)} title="update" pandingText="updating..."  game={game} defaultValue={defaultValue} defaultImageUrl={defaultImageUrl} /> : ""
            }

            <button className="font-medium text-lg text-yellow-500 " title="edit" onClick={() => setModal(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path></svg>
            </button>
        </>
    );
}

export default EditButton;