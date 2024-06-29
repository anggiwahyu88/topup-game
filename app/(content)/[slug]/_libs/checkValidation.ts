type Props = {
    voucher?: { code: string, price: number },
    checkId?: {
        user_id: string,
        zone_id: string,
        code: string
    }
}

interface ResponseData {
    discount?: number;
    username?: string;
}

interface ValidationResponse {
    error: boolean;
    error_type: string;
    message: string;
    data: ResponseData | null;
}

export const checkValidation = async ({ voucher, checkId }: Props): Promise<ValidationResponse> => {
    let response: ValidationResponse = {
        error: false,
        error_type: "",
        message: "",
        data: {}
    };

    if (voucher) {
        const checkVoucher = await fetch("api/voucher", {
            method: "POST",
            body: JSON.stringify(voucher)
        });
        const data = await checkVoucher.json();
        if (data.error) {
            return {
                error: true,
                error_type: "voucher",
                message: data.error,
                data: null
            };
        }
        response.data!.discount = data.discount;
    }

    if (checkId) {
        const responseCheckId = await fetch(`/api/game/check-id`, {
            method: "POST",
            body: JSON.stringify(checkId)
        });
        const responseUsername = await responseCheckId.json();
        if (!responseUsername.result) {
            return {
                error: true,
                error_type: "checkId",
                message: "Id tidak ditemukan",
                data: null
            };
        }
        response.data!.username = responseUsername.data;
    }

    return response;
};
