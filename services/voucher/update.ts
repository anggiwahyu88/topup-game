
import { createClient } from "@/utils/supabase/server"
import { VoucherType } from "@/utils/type"

export const updateVoucher = async (props: VoucherType) => {
    const supabase = createClient()
    const { id, ...parameter } = props
    const { data, error } = await supabase.from("voucher").update(parameter).eq("id", id).select().single()
    if (error) {
        return {
            id: props.id,
            valid: false, errors: {
                user: error.message
            },
            data: null
        }
    }
    return data
}