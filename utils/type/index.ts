export type GameType = {
    id: number,
    created_at: string,
    name: string,
    descripsion: string,
    image_name: string,
    description_instructions: string,
    check_id: string | null,
    zone_id: boolean,
    status: boolean,
    server_list: string | null,
    developer: string,
    name_provider: string,
    path: string
}

export type ProductType = {
    game_id: number,
    code: string,
    game: string,
    name: string,
    price: {
        basic: number,
        premium: number,
        special: number
    },
    server: string,
    status: string
}

export type LogoData = {
    name_product: string;
    name_image: string;
    game_id: number;
};

type BaseResponse = {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string | number;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    fraud_status: string;
    expiry_time: string;
};

type Action = {
    name: string;
    method: string;
    url: string;
};

export type ResponseQris = BaseResponse & {
    merchant_id: string;
    gross_amount: number; // Ensuring the correct type for this specific field
    currency: string;
    acquirer: string;
    actions: Action[];
};

export type ResponseBank = BaseResponse & {
    gross_amount: string;
    permata_va_number: string;
    va_numbers: { bank: string, va_number: string }[]
};

export type PaymentType = {
    name: string,
    type: {
        id: number,
        name: string,
        image_name: string,
        fee: string,
    }[]
}

export type VoucherType={
    id:number,
    code:string,
    discount:number,
    min_spen:number,
    max_dicont:number,
    exp:string,
    max_usage:number
}   