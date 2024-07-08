"use server"

import { checkValidationGame } from "@/utils/schema/service";
import { insertGame } from "@/services/game/insert";

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
    
    const parameter = { image, name, developer, descripsion, name_provider, description_instructions, check_id, zone_id: JSON.parse(zone_id.toString()), server_list, status:JSON.parse(status.toString()) }

    const validate = await checkValidationGame({ ...parameter, isCheck_id: JSON.parse(isCheck_id.toString()), preview })
    
    if (!validate.valid) return validate

    const { error, data } = await insertGame(parameter)
    
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