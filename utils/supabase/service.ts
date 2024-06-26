import { createClient } from "./server";
import { getFileName } from "../getFileName";

type PropsSelectGames = {
    select: string
    search?: string,
    eq?: { name: string, value: any }[]
    single?: boolean
}

type ReturnType<T extends PropsSelectGames> = T["single"] extends true ? any : any[] | null;

export const getGames = async <T extends PropsSelectGames>(props: T): Promise<ReturnType<T>> => {
    const supabase = createClient();
    let query = supabase
        .from("game")
        .select(props.select as "*")
    if (props.search) query.ilike("name", `%${props.search}%`)
    if (props.eq) {
        props.eq.forEach(item => {
            query.eq(item.name, item.value)
        })
    }
    if (props.single) query.single()
    const { data } = await query;
    return data as ReturnType<T>;
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

export const getCount = async (name: string) => {
    const supabase = createClient();
    const { count } = await supabase
        .from(name)
        .select('*', { count: 'exact', head: true })
    return count
}

type GameProps = { name: string, developer: string, descripsion: string, name_provider: string, image: File, description_instructions: string, check_id: string, status: boolean, server_list: string, zone_id: boolean }
export const uploadGame = async (props: { name: string, developer: string, descripsion: string, name_provider: string, image: File, description_instructions: string, check_id: string, status: boolean, server_list: string, zone_id: boolean }) => {
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
    return { error: null, data: insertData }
}

export const updateGameById = async (props: GameProps & { image_name: string, id: number }) => {
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
    return { error: null, data: updateData }
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

export const getAllTransaction = async (select: string) => {
    const supabase = createClient();
    const { data } = await supabase
        .from("transaction")
        .select(select as "*")
    return data
}

type VoucherProps = {
    code: string;
    discount: number | null;
    min_spen: number | null;
    max_dicont: number | null;
    exp: Date | null;
    max_usage: number | null;
}
export const InsertVoucher = async (props: VoucherProps) => {
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

export const UpdateVoucher = async (props: VoucherProps & { id: number }) => {
    const supabase = createClient()
    const { id, ...parameter } = props
    const { data, error } = await supabase.from("voucher").update(parameter).eq("id", id).select().single()
    if (error) {
        return {
            id: props.id,
            valid: false, errors: {
                user: error.message
            },
            data: null
        }
    }
    return data
}