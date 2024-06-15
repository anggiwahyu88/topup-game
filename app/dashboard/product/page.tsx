import { getAllGames, getAllProduct_nonAktif, getURLImage } from "@/utils/supabase/service";
import { getAllProduct } from "@/utils/api/service";
import { createClient } from "@/utils/supabase/server";
import Table from "./Table";


const Page = async () => {
  const games = await getAllGames("id, name,name_provider")
  const product = await getAllProduct()
  const supabase = createClient()
  const { data } = await supabase
    .storage
    .from('image')
    .list('logo', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })
  const logoProduct = await supabase.from("logo product").select("name_image, name_product,game_id")

  const gameMap = new Map(games?.map(game => [game.name_provider, game.id]));

  const result = product
    ?.filter(item => gameMap.has(item.game))
    .map(item => ({
      game_id: gameMap.get(item.game) ?? 0,
      code: item.code,
      game: item.game,
      name: item.name,
      price: item.price,
      server: item.server,
      status: item.status
    })) || null;
  const product_nonAktif = await getAllProduct_nonAktif("code")

  return (
    <div className="pp">
      <section >
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg grid">
          <Table logo={data} defaultImageLogo={logoProduct.data} data={result} product_nonAktif={product_nonAktif} games={games} />
        </div>
      </section>
    </div>
  );
}

export default Page;
