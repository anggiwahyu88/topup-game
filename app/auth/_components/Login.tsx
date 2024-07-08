"use client"

import Layout from "@/app/auth/_components/AuthLayout";
import Input from "@/components/Form/Input";
import Link from "next/link";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useFormState } from "react-dom";
import { action } from "@/server-actions/user/login";

const Login = () => {
    const [state, formAction] = useFormState(action, null)


    // const signUp = async (formData: FormData) => {

    //   const origin = headers().get("origin");
    //   const email = formData.get("email") as string;
    //   const password = formData.get("password") as string;
    //   const supabase = createClient();
    //   const { error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //       emailRedirectTo: `${origin}/auth/callback`,
    //     },
    //   });


    //   if (error) {
    //     return redirect("/login?message=Could not authenticate user");
    //   }

    //   return redirect("/login?message=Check email to continue sign in process");
    // };

    return (
        <Layout errorMsg={state?.errors?.user || null}>
            <Input
                name="email"
                label="Email"
                error={state?.errors?.email}
                placeholder="Masukan Email"
                type="email"
                required
            />
            <Input
                name="password"
                label="Password"
                error={state?.errors?.password}
                placeholder="••••••••"
                type="password"
                required
            />

            <SubmitButton
                formAction={formAction}
                className="bg-primary text-dark rounded-md px-4 py-2 mb-2"
                pendingText="Signing In..."
            >
                Sign In
            </SubmitButton>
            <p className="text-white">{"Don't have an account? "}<Link href={"/auth/signup"}>Sign up</Link></p>
        </Layout>
    )
}

export default Login;