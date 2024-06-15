import { ProductType } from "./type";


export const filterUniqueProduct = (items: ProductType[]) => {
    const nameToItem: { [key: string]: ProductType } = {};
    const nameToCodes: { [key: string]: string[] } = {};

    items.forEach(item => {
        const { name, price, code } = item;
        const maxPrice = Math.max(price.basic, price.premium, price.special);

        if (nameToItem[name]) {
            const existingMaxPrice = Math.max(
                nameToItem[name].price.basic,
                nameToItem[name].price.premium,
                nameToItem[name].price.special
            );
            if (maxPrice > existingMaxPrice) {
                nameToItem[name] = item;
            }
            nameToCodes[name].push(code);
        } else {
            nameToItem[name] = item;
            nameToCodes[name] = [code];
        }
    });

    return Object.values(nameToItem).map(item => {
        const codes = nameToCodes[item.name].join('|');
        return { ...item, code: codes };
    });
};