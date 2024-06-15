"use client"

import AddButton from "@/components/Button/AddButton";
import SerachInput from "@/components/Form/SerachInput";
import FormGameModal from "@/components/Modal/FormGameModal";
import { useState } from "react";

const Heading = ({game}:{game:[]}) => {
    const [modal, setModal] = useState<boolean>(false)

    return (
        <div className="pb-4 w-full flex items-center">
            {
                modal ?
                    <FormGameModal handleClose={() => setModal(false)} title="upload" pandingText="uploading..." game={game} /> : ""
            }
            <SerachInput />
            <AddButton onClick={() => setModal(true)}/>
        </div>
    );
}

export default Heading;