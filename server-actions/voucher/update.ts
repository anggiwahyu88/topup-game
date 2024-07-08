"use server"

import { checkValidationVoucher } from "@/utils/schema/service";
import { updateVoucher } from "@/services/voucher/update";

export const update = async (state: any, formData: FormData) => {
    const code = (formData?.get("code") as string)?.trim();
    const discount = (formData.get("discount") as string);
    const min_spen = (formData.get("min_spen") as string);
    const max_dicont = (formData.get("max_dicont") as string);
    const exp = (formData.get("exp") as string);
    const max_usage = (formData.get("max_usage") as string);
    
    const parameter = { code, discount: discount ? Number(discount) : null, min_spen: min_spen ? Number(min_spen) : null, max_dicont: max_dicont ? Number(max_dicont) : null, exp: exp ? new Date(exp) : null, max_usage: max_usage ? Number(max_usage) : null }
    const validate = await checkValidationVoucher(parameter)

    if (!validate.valid) return {
        id: state.id,
        ...validate,
        data: null
    }
    const data = await updateVoucher({ ...parameter, id: state.id })
    return {
        id: state.id,
        valid: true, errors: null,
        data
    }
}