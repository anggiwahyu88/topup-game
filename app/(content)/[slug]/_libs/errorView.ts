import toast from "react-hot-toast"

export const errorView = (ref: any, msg: string) => {
    scrollTo({
        top: ref.current.offsetTop - 70,
        left: 0,
        behavior: "smooth"
    })
    toast.error(msg)
}