import ProductDasboard from "./ProductDasboard";
import Table from "./Table";
import { getAllProduct_nonAktif } from "@/utils/supabase/service";
import { createClient } from "@/utils/supabase/server";

type Props = {
  searchParams: {
    search: string,
    page: string,
    game_id: string,
  }
}

const Page = async ({ searchParams }: Props) => {
  const supabase = createClient()
  const query = `search=${searchParams?.search || ""}&page=${searchParams?.page || ""}&game=${searchParams?.game_id || ""}`

  const [response, images, logoProduct, product_nonAktif] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/product?${query}`, {
      cache: "no-store"
    }),
    supabase
      .storage
      .from('image')
      .list('logo', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      }),
    supabase.from("logo product").select("name_image, name_product,game_id"),
    getAllProduct_nonAktif("code")
  ])
  const product = await response.json()

  return (
    <div className="pp ml-16">
      <section >
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
          <ProductDasboard data={product.data} games={product.games} maxData={product.count}>
            <Table logo={images.data} defaultImageLogo={logoProduct.data} product_nonAktif={product_nonAktif} />
          </ProductDasboard>
        </div>
      </section>
    </div>
  );
}

export default Page;
