import toast from "react-hot-toast"
import Input from "../Form/Input"
import { actionAddVoucer, actionEditVoucer } from "./_action"
import { SubmitButton } from "../Form/SubmitButton"
import { useFormState } from "react-dom"
import { VoucherType } from "@/utils/type"
import { useEffect } from "react"

type Props = {
    handleClose: () => void,
    defaultValue: VoucherType | null
    setVoucers: React.Dispatch<React.SetStateAction<VoucherType[] | null>>
}

const VoucherModal = ({ handleClose, defaultValue, setVoucers }: Props) => {
    const action = defaultValue ? actionEditVoucer : actionAddVoucer
    const initialState = defaultValue ? { id: defaultValue.id } : null

    const [state, formAction] = useFormState<any, FormData>(action, initialState)
    const pendingText = defaultValue ? "Updating" : "Adding"
    const title = defaultValue ? "Update" : "Add"

    useEffect(() => {
        if (state?.errors?.users) {
            toast.error(state.errors.users)
        }
        if (state?.valid) {
            if (defaultValue) {
                setVoucers(prev => {
                    if (prev == null) return null
                    return prev.map(voucher => voucher.id == defaultValue.id ? state.data : voucher)
                })
                toast.success(defaultValue.code + " has been updated")
            } else {
                setVoucers((prev) => prev ? [...prev, state.data] : [state.data])

                toast.success("Voucher has been added")
            }
            handleClose()
        }
    }, [state, handleClose, setVoucers, defaultValue])

    return (
        <div id="popup-modal" tabIndex={- 1} className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-20 w-full h-screen tracking-wide`} style={{ background: "#00000021" }} >
            <div className="relative w-full max-w-2xl max-h-full left-[50%] top-[50%] py-4" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="rounded-lg shadow bg-gray-700 ">
                    <div className="bg-gray-800 relative rounded-t p-2">
                        <div className="flex items-center text-lg text-white ">
                            <p>Tambah Produk</p>
                        </div>
                        <button type="button" className="absolute top-1/2 right-[-7px] rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center bg-gray-600 text-white" onClick={handleClose} style={{ transform: "translate(0, -50%)" }}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-4">
                        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground !text-black">
                            <Input label="Kode Voucher" defaultValue={defaultValue?.code} error={state?.errors?.code} required name="code" />
                            <Input label="Diskon (%)" defaultValue={defaultValue?.discount} error={state?.errors?.discount} required name="discount" />
                            <Input label="Minimal Pembelian (kosongkan jika tidak ada minimal pembelian)" defaultValue={defaultValue?.min_spen} error={state?.errors?.min_spen} name="min_spen" />
                            <Input label="Maximal Harga discount (kosongkan jika tidak ada maximal harga discount)" defaultValue={defaultValue?.max_dicont} error={state?.errors?.max_dicont} name="max_dicont" />
                            <Input label="expired (kosongkan jika tidak ada expired)" type={"date"} defaultValue={defaultValue?.exp} error={state?.errors?.exp} name="exp" />
                            <Input label="Maximal Pemakaian (kosongkan jika tidak ada maximal pemakaian)" defaultValue={defaultValue?.max_usage} error={state?.errors?.max_usage} name="max_usage" />
                            <SubmitButton
                                formAction={formAction}
                                className="bg-primary text-dark rounded-md px-4 py-2 text-foreground mb-2"
                                pendingText={pendingText}
                            >
                                {title}
                            </SubmitButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoucherModal