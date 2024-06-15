import Form from "./Form";
import { getProduct_nonAktifByGame_id, getGameByPath, getLogoProductByGame_id, getAllPaymets } from "@/utils/supabase/service";
import { getAllProduct } from "@/utils/api/service";
import { notFound } from "next/navigation";
import { PaymentType, ProductType } from "@/utils/type";

const Page = async ({ params }: { params: { slug: string } }) => {
    const data = await getGameByPath(params.slug, "*")
    if (!data) {
        return notFound()
    }
    const [productsNonActive, logoProduct, products, payments] = await Promise.all([
        getProduct_nonAktifByGame_id(data.id),
        getLogoProductByGame_id(data.id),
        getAllProduct(data.name_provider),
        getAllPaymets("id,name,image_name,fee,payment_category(name)")
    ]);

    const imageGame = `${process.env.NEXT_PUBLIC_IMAGE_URL}game/${data.image_name}`

    interface NonActiveProduct {
        name_product: string;
    }

    interface LogoProduct {
        name_product: string;
        name_image: string;
    }

    type Product = (ProductType & { name_image?: string | null; })[]

    const getFilteredAndUpdatedProducts = (
        products: Product | null,
        productsNonActive: NonActiveProduct[] | null,
        logoProduct: LogoProduct[] | null
    ): { normal: Product, spesial: Product } => {
        if (!products) return { normal: [], spesial: [] };

        const nonActiveCodes = new Set(productsNonActive?.map(nonActive => nonActive.name_product) || []);
        const logoMap = new Map(logoProduct?.map(logo => [logo.name_product, logo.name_image]) || []);

        const productsNormal: Product = [];
        const productSpesial: Product = [];

        products.forEach(product => {
            if (!nonActiveCodes.has(product.name)) {
                const updatedProduct = { ...product, name_image: logoMap.get(product.name) || null };
                if (/^\d/.test(product.name)) {
                    productsNormal.push(updatedProduct);
                } else {
                    productSpesial.push(updatedProduct);
                }
            }
        });

        return { normal: productsNormal, spesial: productSpesial };
    };
    let resultPayments = null
    if (payments) {
        const transformedData = payments.reduce((acc: { [key: string]: PaymentType }, item) => {
            const category = item.payment_category.name;
            if (!acc[category]) {
                acc[category] = { name: category, type: [] };
            }
            const { id, name, image_name, fee } = item;
            acc[category].type.push({ id, name, image_name, fee });
            return acc;
        }, {});
        resultPayments = Object.values(transformedData);
    }
    const result = getFilteredAndUpdatedProducts(products, productsNonActive, logoProduct);
    return (
        <div className="pp">
            <div className="border border-white h-36">
            </div>
            <Form game={data} imageGame={imageGame} payments={resultPayments} products={result} />
        </div>
    )
}

export default Page;