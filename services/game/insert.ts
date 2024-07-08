import { revalidateTag } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getFileName } from "@/utils/getFileName";
import { GameType } from "@/utils/type";

export const insertGame = async (props: Omit<GameType, 'id' | 'created_at' | 'path' | 'image_name'> & { image: File }) => {
    const { image, ...data } = props;
    const supabase = createClient();
    const filename = getFileName(image.type.split("/")[1] || "");
    const path = props?.name.toLowerCase().replace(/\s+/g, '-');

    const { error: insertError, data: insertData } = await supabase
        .from('game')
        .insert({ ...data, image_name: filename, path }).select().single();

    if (insertError) {
        return { error: insertError }
    }

    const { error: uploadError } = await supabase
        .storage
        .from('image')
        .upload(`game/${filename}`, props.image, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        return { error: uploadError }
    }
    revalidateTag("game")
    return { error: null, data: insertData }
}