'use server'

import { checkValidationPrice } from "@/utils/schema/service";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const action = async (state: any, formData: FormData) => {
    const basic = formData.get("basic") as string;
    const reseller = formData.get("reseller") as string;
    const vip = formData.get("vip") as string;

    const validate = await checkValidationPrice({ basic:Number(basic), reseller:Number(reseller), vip:Number(vip) })
    if (!validate.valid) return validate

    const supabase = createClient();

    const { error } = await supabase.from("price").insert({
        basic: basic,
        reseller: reseller,
        vip: vip
    });
    if (error) {
        return {
            valid: false, errors: {
                user: error.message
            }
        }
    }
    return {
        valid: true, errors: null
    }
}