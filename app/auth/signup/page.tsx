"use client"

import Layout from "../Layout";
import Input from "@/components/Form/Input";
import Link from "next/link";
import { SubmitButton } from "@/components/Form/SubmitButton";
import { useFormState } from "react-dom";
import { action } from "@/server-actions/user/register";

const Page = () => {
    const [state, formAction] = useFormState(action, null)

    return (
        <Layout errorMsg={state?.errors?.user || null}>
            <Input
                name="fullname"
                label="Nama Lengkap"
                error={state?.errors?.fullname}
                placeholder="Masukan Nama"
                required
            />
            <Input
                name="email"
                label="Email"
                error={state?.errors?.email}
                placeholder="Masukan Email"
                required
            />
            <Input
                name="password"
                label="Password"
                error={state?.errors?.password}
                placeholder="••••••••"
                required
            />
            <SubmitButton
                formAction={formAction}
                className="bg-primary text-dark rounded-md px-4 py-2 mb-2"
                pendingText="Signing Up..."
            >
                Sign Up
            </SubmitButton>
            <p className="text-white">Do you have an account? <Link href={"/auth/login"}>Sign</Link></p>
        </Layout>
    );
}

export default Page;