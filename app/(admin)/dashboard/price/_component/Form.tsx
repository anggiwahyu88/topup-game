"use client"

import Input from "@/components/Form/Input";
import toast from "react-hot-toast";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { action } from "@/server-actions/products/price/action";

const Form = ({ defaultValue }: { defaultValue: { basic: number, reseller: number, vip: number } | null }) => {
    const [state, formAction] = useFormState(action, null)
    useEffect(() => {
        if (state?.valid) {
            toast.success("Berhasil di simpan")
        }
    }, [state])
    return (
        <form action="" className="md:max-w-xl w-full">
            <Input label="Harga Basic (%)" className={"w-full"} type="number" name="basic" error={state?.errors?.basic} required defaultValue={defaultValue?.basic} />
            <Input label="Harga Reseller (%)" className={"w-full"} type="number" name="reseller" error={state?.errors?.reseller} required defaultValue={defaultValue?.reseller} />
            <Input label="Harga Vip (%)" className={"w-full"} type="number" name="vip" error={state?.errors?.vip} required defaultValue={defaultValue?.vip} />
            <div className="w-full flex">
                <SubmitButton
                    formAction={formAction}
                    className="bg-primary text-dark rounded-md px-4 py-2 mb-2 ml-auto"
                    pendingText="Saving..."
                >
                    Simpan
                </SubmitButton>
            </div>
        </form>
    )
}

export default Form;