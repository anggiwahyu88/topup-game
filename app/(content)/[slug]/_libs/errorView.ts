import toast from "react-hot-toast"

export const errorView = (id: string, msg: string) => {
    const element = document.getElementById(id)    
    if (element) {
        scrollTo({
            top: element.offsetTop - 70,
            left: 0,
            behavior: "smooth"
        })
        toast.error(msg)
    }
}