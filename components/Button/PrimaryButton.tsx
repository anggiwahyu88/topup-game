const Button = ({ disabled, onClick, className, children }: { disabled: any, onClick: () => void, className?: string, children: React.ReactNode }) => {
    return (
        <button onClick={onClick} type="button" className={`bg-primary text-dark rounded-xl py-2 px-3  tracking-wider hover:brightness-75 transition-all duration-300 flex items-center justify-center gap-2 text-md disabled:brightness-75 ${className}`} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;