"use server"

import { checkValidationGame, checkValidationVoucher } from "@/utils/schema/service";
import { createClient } from "@/utils/supabase/server";
import { updateGameById, uploadGame } from "@/utils/supabase/service";

export const add = async (state: any, formData: FormData) => {
    const name = (formData?.get("name") as string)?.trim();
    const descripsion = (formData.get("descripsion") as string)?.trim();
    const developer = (formData.get("developer") as string)?.trim();
    const image = formData.get('image') as File
    const name_provider = (formData.get("name_provider") as string)?.trim();
    const preview = formData.get("preview") as string;
    const description_instructions = (formData.get("description_instructions") as string)?.trim();
    const check_id = formData.get("check_id") as string;
    const isCheck_id = formData?.get("isCheck_id") || "false" as string;
    const server_list = (formData.get("server_list") as string)?.trim();
    const status = formData?.get("status") || "false" as string;
    const zone_id = formData?.get("zone_id") || "false" as string;

    const validate = await checkValidationGame({ image, name, developer, descripsion, name_provider, description_instructions, check_id, preview, isCheck_id, server_list, status, zone_id })

    if (!validate.valid) return validate

    const { error,data } = await uploadGame({ image, name, developer, descripsion, name_provider, description_instructions, check_id, status: JSON.parse(`${status}`), server_list, zone_id: JSON.parse(`${zone_id}`) })
    if (error) {
        return {
            valid: false, errors: {
                user: error.message
            }
        }
    }
    return {
        valid: true, errors: null,data
    }
}

export const update = async (state: any, formData: FormData) => {
    const name = (formData?.get("name") as string)?.trim();
    const descripsion = (formData.get("descripsion") as string)?.trim();
    const developer = (formData.get("developer") as string)?.trim();
    const image = formData.get('image') as File
    const name_provider = (formData.get("name_provider") as string)?.trim();
    const preview = formData.get("preview") as string;
    const description_instructions = (formData.get("description_instructions") as string)?.trim();
    const check_id = formData.get("check_id") as string;
    const isCheck_id = formData?.get("isCheck_id") || "false" as string;
    const server_list = (formData.get("server_list") as string)?.trim();
    const status = formData?.get("status") || "false" as string;
    const zone_id = formData?.get("zone_id") || "false" as string;
    
    const validate = await checkValidationGame({ image, name, developer, descripsion, name_provider, description_instructions, check_id, preview, isCheck_id, server_list, status, zone_id })

    if (!validate.valid) return {
        id: state.id,
        image_name: state.image_name,
        ...validate
    }
    const { error } = await updateGameById({ image, name, developer, descripsion, name_provider, description_instructions, check_id, status: JSON.parse(`${status}`), server_list, zone_id: JSON.parse(`${zone_id}`), image_name: state.image_name, id: state.id })
    if (error) {
        return {
            id: state.id,
            image_name: state.image_name,
            valid: false, errors: {
                user: error.message
            }
        }
    }
    return {
        id: state.id,
        image_name: state.image_name,
        valid: true, errors: null
    }
}

export const actionAddVoucer = async (state: any, formData: FormData) => {
    const code = (formData?.get("code") as string)?.trim();
    const discount = (formData.get("discount") as string);
    const min_spen = (formData.get("min_spen") as string);
    const max_dicont = (formData.get("max_dicont") as string);
    const exp = (formData.get("exp") as string);
    const max_usage = (formData.get("max_usage") as string);

    const parameter = { code, discount: discount ? Number(discount) : null, min_spen: min_spen ? Number(min_spen) : null, max_dicont: max_dicont ? Number(max_dicont) : null, exp: exp ? new Date(exp) : null, max_usage: max_usage ? Number(max_usage) : null }
    const validate = await checkValidationVoucher(parameter)

    if (!validate.valid) return {
        ...validate,
        data: null
    }
    const supabase = createClient()
    const { data, error } = await supabase.from("voucher").insert(parameter).select().single()
    if (error) {
        return {
            valid: false,
            errors: {
                user: error.message
            },
            data: null
        }
    }

    return {
        valid: true, errors: null, data
    }

}

export const actionEditVoucer = async (state: any, formData: FormData) => {
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
    const supabase = createClient()

    const { data, error } = await supabase.from("voucher").update(parameter).eq("id", state.id).select().single()
    if (error) {
        return {
            id: state.id,
            valid: false, errors: {
                user: error.message
            },
            data: null
        }
    }
    return {
        id: state.id,
        valid: true, errors: null,
        data
    }
}