import { checkValidationGame } from "@/utils/schema/service";
import { updateGameById } from "@/utils/supabase/service";

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

    const parameter = { image, name, developer, descripsion, name_provider, description_instructions, check_id, preview, isCheck_id, server_list }
    const validate = await checkValidationGame({ ...parameter, zone_id, status })

    if (!validate.valid) return {
        id: state.id,
        image_name: state.image_name,
        ...validate
    }
    const { error, data } = await updateGameById({ ...parameter, zone_id: JSON.parse(zone_id.toString()), status: JSON.parse(status.toString()), id: state.id, image_name: state.image_name })
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
        valid: true,
        errors: null,
        data
    }
}