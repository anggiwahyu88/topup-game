'use server'

import { checkValidationLogin } from "@/utils/schema/service";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const action = async (state: any, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validate = await checkValidationLogin({ email, password })
    if (!validate.valid) return validate

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
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