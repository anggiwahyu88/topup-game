type ValidSchema = { valid: boolean, errors: null };
type InvalidSchema = { valid: boolean; errors: { [key: string]: string; }; };

import { CategorySchema, GameSchema, LoginSchema, ProductSchema, SignupSchema } from ".";

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

export const checkValidationProduct = async (props: { amount: number, price: number }) => {
    try {
        await ProductSchema.validate({
            amount: Number(props.amount),
            price: Number(props.price)
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

export const checkValidationCategory = async (props: { name: string, image: File | null, preview: string }) => {
    try {
        await CategorySchema.validate({
            name: props.name, image: props.image, preview: props.preview
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