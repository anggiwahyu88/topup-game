import { ProductType } from "@/utils/type";

type Product = (ProductType & { game_id: number, active: boolean, img_name: string | null })[]


export const filterProduct = (
    products: Product | null,
): { normal: Product, spesial: Product } => {
    if (!products) return { normal: [], spesial: [] };

    const productsNormal: Product = [];
    const productSpesial: Product = [];

    products.forEach(product => {
        if (/^\d/.test(product.name)) {
            productsNormal.push(product);
        } else {
            productSpesial.push(product);
        }
    });


    return { normal: productsNormal, spesial: productSpesial };
};