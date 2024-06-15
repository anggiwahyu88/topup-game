"use client"

const AddButton = ({ className = "", ...props}:{[key: string]: any}) => {
    return (
        <button title="add" className={`bg-primary h-7 w-7 flex justify-center items-center text-2xl text-dark rounded-md hover:brightness-90 transition-all duration-300 ${className}`} {...props}>
            +
        </button>
    );
}

export default AddButton;