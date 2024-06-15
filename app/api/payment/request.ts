import { getCurrentTime } from "@/utils/getCurrentTime"
import { ResponseBank, ResponseQris } from "@/utils/type"


const api = async (parameter: any, payment_type: string, payment_detail: any) => {
    try {
        const response = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
            method: "POST",
            body: JSON.stringify({
                payment_type,
                ...payment_detail,
                "custom_expiry": {
                    "order_time": getCurrentTime(),
                    "expiry_duration": 120,
                    "unit": "minute"
                },
                ...parameter
            }),
            headers: {
                'Authorization': `Basic ${btoa(`${process.env.SERVER_KEY}:${""}`)}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        const data = await response.json()
        return data
    } catch {
        return {
            error: true,
            msg: "internal server error"
        }
    }

}
type ResponseEroor = {
    error: boolean,
    msg: string
}

export const qris = async (parameter: any) => {
    const data: ResponseQris | ResponseEroor = await api(parameter, "qris", {
        "qris": {
            "acquirer": "gopay"
        }
    })

    if ('error' in data) {
        return data;
    }

    return {
        staus_code: data.status_code,
        status_message: data.status_message,
        transaction_id: data.transaction_id,
        transaction_time: data.transaction_time,
        payment_type: "transfer_bank",
        actions: data.actions,
        exp: data.expiry_time
    }
}

export const transfer_bank = async (parameter: any, type_bank: string) => {

    const data: ResponseBank|ResponseEroor = await api(parameter, "bank_transfer", {
        "bank_transfer": {
            "bank": type_bank,
        }
    })

    if ('error' in data) {
        return data;
    }

    const va_number = data?.va_numbers || [
        {
            "bank": "permata",
            "va_number": data.permata_va_number
        }
    ]
    return {
        staus_code: data.status_code,
        status_message: data.status_message,
        transaction_id: data.transaction_id,
        transaction_time: data.transaction_time,
        payment_type: "transfer_bank",
        actions: va_number,
        exp: data.expiry_time
    }
}