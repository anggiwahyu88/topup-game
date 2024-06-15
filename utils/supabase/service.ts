import { createClient } from "./server";
import { getFileName } from "../getFileName";


export const getAllGames = async (select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("game")
        .select(select as "*");
    return data
}

export const getAllGamesActive = async (select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("game")
        .select(select as "*")
        .eq("status", true);        
    return data
}

export const getGameByPath = async (path: string, select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("game")
        .select(select as "*")
        .eq("path", path)
        .eq("status", true)
        .single();
    return data
}

export const getURLImage = (path: string) => {
    const supabase = createClient();
    const { data } = supabase
        .storage
        .from('image')
        .getPublicUrl(path)
    return data
}

export const getCount = async (name: string) => {
    const supabase = createClient();
    const { count } = await supabase
        .from(name)
        .select('*', { count: 'exact', head: true })
    return count
}

export const uploadGame = async (props: { name: string, developer: string, descripsion: string, name_provider: string, image: File, description_instructions: string, check_id: string, status: boolean, server_list: string, zone_id: boolean }) => {
    const { image, ...data } = props;
    const supabase = createClient();
    const filename = getFileName(image.type.split("/")[1] || "");
    const path = props?.name.toLowerCase().replace(/\s+/g, '-');

    const { error: insertError } = await supabase
        .from('game')
        .insert({ ...data, image_name: filename, path });

    if (insertError) {
        return { error: insertError }
    }

    const { error: uploadError, data: uploadData } = await supabase
        .storage
        .from('image')
        .upload(`game/${filename}`, props.image, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        return { error: uploadError }
    }
    return { error: null }
}

export const updateGameById = async (props: { name: string, developer: string, descripsion: string, name_provider: string, image: File, description_instructions: string, check_id: string, status: boolean, server_list: string, zone_id: boolean, image_name: string, id: number }) => {
    const { image, id, ...data } = props;
    const supabase = createClient();
    const filename = getFileName(image.type.split("/")[1] || "");
    const path = props?.name.toLowerCase().replace(/\s+/g, '-');

    const { error: insertError } = await supabase
        .from('game')
        .insert({ ...data, image_name: filename, path });

    if (insertError) {
        return { error: insertError }
    }

    const { error: uploadError, data: uploadData } = await supabase
        .storage
        .from('image')
        .upload(`game/${filename}`, props.image, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        return { error: uploadError }
    }
    return { error: null }
}

export const getAllProduct_nonAktif = async (select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("product_nonAktif")
        .select(select as "*");
    return data
}

export const getProduct_nonAktifByGame_id = async (game_id: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("product_nonAktif")
        .select("name_product")
        .eq("game_id", game_id);
    return data
}

export const getLogoProductByGame_id = async (game_id: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("logo product")
        .select("name_product, name_image")
        .eq("game_id", game_id);
    return data
}

export const getAllPaymets = async (select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("payment")
        .select(select as "*")
        .eq("status", true);
    
    return data
}