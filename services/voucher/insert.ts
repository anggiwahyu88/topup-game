import { createClient } from "@/utils/supabase/server"
import { VoucherType } from "@/utils/type"

export const insertVoucher = async (props: Omit<VoucherType, 'id'>) => {
    const supabase = createClient()
    const { data, error } = await supabase.from("voucher").insert(props).select().single()
    if (error) {
        return {
            valid: false,
            errors: {
                user: error.message
            },
            data: null
        }
    }
    return data
}