import { useId } from 'react';

type Props = {
    error?: string
    name?: string
    label?: string
    className?: string | any
    [key: string]: any;
}

const Input = ({ error, name, label, className, ...props }: Props) => {
    const id = useId()

    return (
        <div className="w-full mb-4 flex flex-col gap-2">
            <label className="text-md text-white" htmlFor={id}>
                {label}
            </label>
            <input
                {...props}
                id={id}
                className={`rounded-md px-4 py-2 bg-inherit border-2 bg-white ${className} ${error ? "border-red-500" : ""}`}
                name={name}
            />
            {error ? <p className="text-red-500 font-semibold">{error}</p> : ""}
        </div>
    );
}

export default Input