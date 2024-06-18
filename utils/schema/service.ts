type ValidSchema = { valid: boolean, errors: null };
type InvalidSchema = { valid: boolean; errors: { [key: string]: string; }; };

import { GameSchema, LoginSchema, PriceSchema, SignupSchema, VoucherSchema } from ".";

export const checkValidationLogin = async (props: { email: string, password: string }) => {
    try {
        await LoginSchema.validate({
            email: props.email,
            password: props.password,
        }, { abortEarly: false, strict: true })
        return {
            valid: true,
            errors: null
        } as ValidSchema
    }
    catch (err: any) {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
            if (error.path) {
                errorObj[error.path] = error.message;
            }
        });
        return {
            valid: false,
            errors: errorObj
        } as InvalidSchema;
    }
}

export const checkValidationSignup = async (props: { email: string, password: string, fullname: string }) => {
    try {
        await SignupSchema.validate({
            email: props.email,
            fullname: props.fullname,
            password: props.password,
        }, { abortEarly: false, strict: true })
        return {
            valid: true,
            errors: null
        } as ValidSchema
    }
    catch (err: any) {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
            if (error.path) {
                errorObj[error.path] = error.message;
            }
        });
        return {
            valid: false,
            errors: errorObj
        } as InvalidSchema;
    }
}

export const checkValidationGame = async (props: { name: string, developer: string, descripsion: string, name_provider: string, image: File, preview: string, description_instructions: string, check_id: string, isCheck_id: any, status: any, server_list: string, zone_id: any }) => {
    try {
        await GameSchema.validate({
            ...props
        }, { abortEarly: false, strict: true })
        return {
            valid: true,
            errors: null
        } as ValidSchema
    }
    catch (err: any) {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
            if (error.path) {
                errorObj[error.path] = error.message;
            }
        });
        return {
            valid: false,
            errors: errorObj
        } as InvalidSchema;
    }
}

export const checkValidationPrice = async (props: { basic: number, reseller: number, vip: number }) => {
    try {
        await PriceSchema.validate({
            basic: props.basic,
            reseller: props.reseller,
            vip: props.vip,
        }, { abortEarly: false, strict: true })
        return {
            valid: true,
            errors: null
        } as ValidSchema
    }
    catch (err: any) {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
            if (error.path) {
                errorObj[error.path] = error.message;
            }
        });
        return {
            valid: false,
            errors: errorObj
        } as InvalidSchema;
    }
}

export const checkValidationVoucher = async (props: { code: string, discount: number|null, min_spen: number | null, max_dicont: number | null, exp: Date | null, max_usage: number | null }) => {
    try {
        await VoucherSchema.validate({
            code: props.code,
            discount: props.discount,
            min_spen: props.min_spen,
            max_dicont: props.max_dicont,
            exp: props.exp,
            max_usage: props.max_usage,
        }, { abortEarly: false, strict: true })
        return {
            valid: true,
            errors: null
        } as ValidSchema
    }
    catch (err: any) {
        const errorObj: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
            if (error.path) {
                errorObj[error.path] = error.message;
            }
        });
        return {
            valid: false,
            errors: errorObj
        } as InvalidSchema;
    }
}