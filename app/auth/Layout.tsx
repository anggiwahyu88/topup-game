import ErrorMsg from "@/components/EroorMsg";

interface ILayout {
    errorMsg: string | null, children: React.ReactNode
}

const Layout: React.FC<ILayout> = ({ errorMsg, children }) => {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                <ErrorMsg msg={errorMsg || ""} />
                {children}
            </form>
        </div>
    );
}

export default Layout;