import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getFileName } from "@/utils/getFileName";

export async function POST(request: NextRequest) {
    const supabase = createClient()
    const formData = await request.formData();
    const file = formData.get('image') as File
    if (file?.type.split("/")[0] != "image") {
        return NextResponse.json({
            error: true,
            msg: "invalid image"
        });
    }
    const new_img_name = getFileName(file.type.split("/")[1]);
    const { error } = await supabase.storage.from('image').upload(`logo/${new_img_name}`, file, {
        cacheControl: '3600',
        upsert: true
    })
    if (error) {
        return NextResponse.json({
            error: true,
            msg: error.message
        });
    }
    return NextResponse.json({
        error: true,
        msg: "upload succses"
    });
}

export async function PUT(request: NextRequest) {
    const supabase = createClient()
    const { name_image, name_product, game_id } = await request.json();
    const { data } = supabase
        .storage
        .from('image')
        .getPublicUrl(`logo/${name_image}`)

    if (name_image == "none") {
        const logo_products = await supabase
            .from("logo product")
            .delete()
            .eq("name_product", name_product)
            .select("name_image, name_product");
        if (logo_products.error) {
            return NextResponse.json({
                error: true,
                msg: logo_products.error.message,
                data: null
            });
        }
        return NextResponse.json({
            error: false,
            msg: "update succses",
            data: logo_products.data
        });
    }
    if (!data.publicUrl) {
        return NextResponse.json({
            error: true,
            msg: "invalid image",
            data: null
        });
    }
    const logo_products = await supabase
        .from("logo product")
        .insert({ name_image, name_product, game_id })
        .select("name_image, name_product");

    if (logo_products.error) {
        return NextResponse.json({
            error: true,
            msg: logo_products.error.message,
            data: null
        });
    }
    return NextResponse.json({
        error: false,
        msg: "update succses",
        data: logo_products.data
    });
}