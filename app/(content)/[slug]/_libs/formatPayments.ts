import { PaymentType } from "@/utils/type";

export const formatPayments = (payments: PaymentType[] | null) => {
    const transformedData = payments?.reduce((acc: { [key: string]: PaymentType }, item: any) => {
        const category = item.payment_category.name;
        if (!acc[category]) {
            acc[category] = { name: category, type: [] };
        }
        const { id, name, image_name, fee } = item;
        acc[category].type.push({ id, name, image_name, fee });
        return acc;
    }, {}) || [];
    return Object.values(transformedData);
}