'use server'

import { checkValidationSignup } from "@/utils/schema/service";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const action = async (state: any, formData: FormData) => {
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullname = formData.get("fullname") as string;
    
    const validate = await checkValidationSignup({email,fullname,password})
    if (!validate.valid) return validate

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullname
            },
            // emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        return {
            valid: false, errors: {
                user: error.message
            }
        }
    }
    return redirect("/")
}