"use client"

import Input from "./Form/Input"
import Image from "next/image"
import { SubmitButton } from "./Form/SubmitButton"
import { useFormState } from "react-dom"
import { useState } from "react"

interface IForm {
    defaultValue?: {
        id: number,
        name: string,
        img_name: string,
    } | null,
    title: string,
    pandingText: string,
    default_img?: string | null,
    action: any
}

interface FormState {
    errors?: {
        name?: string;
        image?: string;
        preview?: string
    };
}

const initialFormState: FormState = {
    errors: {},
};

const CategoryForm: React.FC<IForm> = ({ defaultValue, title, pandingText, default_img, action }) => {
    const [imageUrl, setimageUrl] = useState<string | null>(default_img || null);
    const [state, formAction] = useFormState(action, initialFormState);
    const [imageValue, setImageValue] = useState("")

    const handleFileChange = (e: React.ChangeEvent) => {
        const file = (e.target as HTMLInputElement).files?.[0] || null;
        if (file) {
            setImageValue((e.target as HTMLInputElement).value)
            setimageUrl(URL?.createObjectURL(file))
        }
    };
    const handleDeleteImage = () => {
        setImageValue("")
        setimageUrl("")
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <Input
                    name="name"
                    label="Nama"
                    error={state?.errors?.name}
                    placeholder="Masukan Nama"
                    defaultValue={defaultValue?.name}
                    required
                />
                <label className="text-md text-white" htmlFor="image">
                    Image
                </label>
                <div className="mb-4">
                    <input
                        className={`${imageUrl ? "hidden" : "block"} w-full border-2 rounded-md cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400 ${state?.errors?.image || state?.errors?.preview ? "border-red-500" : ""}`}
                        name="image"
                        id="image"
                        type="file"
                        onChange={handleFileChange}
                        value={imageValue}
                        accept="image/*"
                    />
                    {imageUrl ? (
                        <div className="flex items-center gap-2">
                            <input
                                id="preview"
                                className="hidden"
                                name="preview"
                                value={imageUrl === default_img ? 'default' : imageUrl ? 'true' : ''}
                                readOnly
                            />
                            <Image src={imageUrl} alt="Preview" className="w-full max-w-36 h-auto rounded-lg" width={0} height={0} sizes="6rem" />
                            <button className="font-medium text-xl text-red-500" title="delete" onClick={handleDeleteImage} type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                            </button>
                        </div>
                    ) : (
                        <p className="mt-1 text-sm text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    )}

                    {state?.errors?.image || state?.errors?.preview ? <p className="text-red-500">{state.errors.image ? state?.errors?.image : state?.errors?.preview}</p> : ""}
                </div>
                <SubmitButton
                    formAction={formAction}
                    className="bg-primary text-dark rounded-md px-4 py-2 text-foreground mb-2"
                    pendingText={pandingText}
                >
                    {title}
                </SubmitButton>
            </form>
        </div>
    );
}

export default CategoryForm;
