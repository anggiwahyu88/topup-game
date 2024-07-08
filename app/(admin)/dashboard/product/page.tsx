import ProductDasboard from "./_component/ProductDasboard";
import { createClient } from "@/utils/supabase/server";
import { getProduct } from "@/services/api/getProduct";

type Props = {
  searchParams: {
    search: string,
    page: string,
    game_id: string,
  }
}

const Page = async ({ searchParams }: Props) => {
  const supabase = createClient()
  const query = `search=${searchParams?.search || ""}&page=${searchParams?.page || "1"}&game=${searchParams?.game_id || ""}`

  const [product, images] = await Promise.all([
    getProduct(query),
    supabase
      .storage
      .from('image')
      .list('logo', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      }),
  ])

  return (
    <section className='ml-16 2xl:ml-0'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
        <ProductDasboard data={product.data} games={product.games} maxData={product.count} logo={images.data} />
      </div>
    </section>
  );
}

export default Page;
