import { revalidateTag } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getFileName } from "@/utils/getFileName";
import { GameType } from "@/utils/type";

export const updateGame = async (props: Omit<GameType, 'created_at' | 'path'> & { image: File }) => {
    const { image, id, image_name, ...data } = props;
    const supabase = createClient();
    const path = props?.name.toLowerCase().replace(/\s+/g, '-');
    let filename = props.image_name;
    if (image.size > 0) {
        filename = getFileName(image.type.split("/")[1] || "");
        const [deleteImage, uploadImage] = await Promise.all([
            supabase
                .storage
                .from('image')
                .remove([`game/${props.image_name}`]),
            supabase
                .storage
                .from('image')
                .upload(`game/${filename}`, props.image, {
                    cacheControl: '3600',
                    upsert: false
                })
        ])
        if (deleteImage.error) {
            return { error: deleteImage.error }
        }
        if (uploadImage.error) {
            return { error: uploadImage.error }
        }
    }

    const { error: updateError, data: updateData } = await supabase
        .from('game')
        .update({ ...data, image_name: filename, path }).eq('id', id).select().single();
    if (updateError) {
        return { error: updateError }
    }
    revalidateTag("game")
    return { error: null, data: updateData }
}