"use client"

import ErrorMsg from "./EroorMsg";
import Input from "./Form/Input";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useFormState } from "react-dom";

interface IForm {
    action: any
    defaultValue?: {
        amount: number,
        price: number
    },
    category: string,
}

interface FormState {
    errors?: {
        amount?: string;
        price?: string;
        user?: string;
    };
    valid:boolean
}

const initialFormState: FormState = {
    valid:false,
    errors: {},
};

const ProductForm: React.FC<IForm> = ({ defaultValue, category, action }) => {
    const [state, formAction] = useFormState<FormState>(action, initialFormState);

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <ErrorMsg msg={state?.errors?.user || ""} />
                <div className="mb-6 flex flex-col gap-2">
                    <label className="text-md text-white" htmlFor="amount">
                        Jumlah
                    </label>
                    <div className={`rounded-lg flex h-min has-[:focus]:outline-primary has-[:focus]:outline outline-2 ${state?.errors?.amount ? "border-2 border-red-500" : ""}`}>
                        <input
                            id="amount"
                            className="focus:outline-none border-none bg-white rounded-l-lg px-4 py-2 bg-inherit w-[30%]"
                            name="amount"
                            placeholder="Jumlah"
                            required
                            type="text"
                            defaultValue={defaultValue?.amount}
                        />
                        <div className="w-[70%] bg-white h-min px-4 py-2 rounded-r-lg ">
                            <label htmlFor="amount">{category}</label>
                        </div>
                    </div>
                    {state?.errors?.amount ? <p className="text-red-500">{state?.errors?.amount}</p> : ""}
                </div>
                <Input
                    name="price"
                    label="Harga"
                    error={state?.errors?.price}
                    placeholder="Masukan Harga"
                    defaultValue={defaultValue?.price}
                />
                <SubmitButton
                    formAction={formAction}
                    className="bg-primary text-dark rounded-md px-4 py-2 text-foreground mb-2"
                    pendingText={defaultValue ? "Updating..." : "Uploading..."}
                >
                    {defaultValue ? "Update" : "Upload"}
                </SubmitButton>
            </form>
        </div>
    );
}

export default ProductForm;