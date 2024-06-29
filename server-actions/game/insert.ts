import { checkValidationGame } from "@/utils/schema/service";
import { uploadGame } from "@/utils/supabase/service";

export const insert = async (state: any, formData: FormData) => {
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

    const { error, data } = await uploadGame({ image, name, developer, descripsion, name_provider, description_instructions, check_id, status: JSON.parse(`${status}`), server_list, zone_id: JSON.parse(`${zone_id}`) })
    if (error) {
        return {
            valid: false, errors: {
                user: error.message
            }
        }
    }
    return {
        valid: true, errors: null, data
    }
}