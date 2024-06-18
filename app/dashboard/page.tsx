import Link from 'next/link';
import { getCount } from '@/utils/supabase/service';

interface Product {
    name: string;
    color: string;
    category: string;
    accessories: string;
    available: string;
    price: string;
    weight: string;
}

const products: Product[] = [
    {
        name: 'Apple MacBook Pro 17"',
        color: 'Silver',
        category: 'Laptop',
        accessories: 'Yes',
        available: 'Yes',
        price: '$2999',
        weight: '3.0 lb.'
    }
    // Add more products as needed
];

const Page: React.FC = async () => {
    const countGame = await getCount('game')
    const countCategory = await getCount('category')

    return (
        <div className='pp ml-16'>
            <section className='grid grid-cols-4 gap-4 justify-center mb-8 mt-4'>
                <Link href={"/dashboard/game"} className='bg-gray-800 p-6 flex w-min mx-auto'>
                    <div>
                        <div className='text-4xl text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor " viewBox="0 0 256 256"><path d="M247.44,173.75a.68.68,0,0,0,0-.14L231.05,89.44c0-.06,0-.12,0-.18A60.08,60.08,0,0,0,172,40H83.89a59.88,59.88,0,0,0-59,49.52L8.58,173.61a.68.68,0,0,0,0,.14,36,36,0,0,0,60.9,31.71l.35-.37L109.52,160h37l39.71,45.09c.11.13.23.25.35.37A36.08,36.08,0,0,0,212,216a36,36,0,0,0,35.43-42.25ZM104,112H96v8a8,8,0,0,1-16,0v-8H72a8,8,0,0,1,0-16h8V88a8,8,0,0,1,16,0v8h8a8,8,0,0,1,0,16Zm40-8a8,8,0,0,1,8-8h24a8,8,0,0,1,0,16H152A8,8,0,0,1,144,104Zm84.37,87.47a19.84,19.84,0,0,1-12.9,8.23A20.09,20.09,0,0,1,198,194.31L167.8,160H172a60,60,0,0,0,51-28.38l8.74,45A19.82,19.82,0,0,1,228.37,191.47Z"></path></svg>
                        </div>
                        <p className='text-white tracking-wider text-xl mt-2'>Games</p>
                    </div>
                    <div className='flex items-center ml-12 '>
                        <p className='text-primary text-4xl font-medium'>{countGame}</p>
                    </div>
                </Link>
                <Link href={"/dashboard/category"} className='bg-gray-800 p-6 flex w-min mx-auto'>
                    <div>
                        <div className='text-4xl text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor " viewBox="0 0 256 256"><path d="M247.44,173.75a.68.68,0,0,0,0-.14L231.05,89.44c0-.06,0-.12,0-.18A60.08,60.08,0,0,0,172,40H83.89a59.88,59.88,0,0,0-59,49.52L8.58,173.61a.68.68,0,0,0,0,.14,36,36,0,0,0,60.9,31.71l.35-.37L109.52,160h37l39.71,45.09c.11.13.23.25.35.37A36.08,36.08,0,0,0,212,216a36,36,0,0,0,35.43-42.25ZM104,112H96v8a8,8,0,0,1-16,0v-8H72a8,8,0,0,1,0-16h8V88a8,8,0,0,1,16,0v8h8a8,8,0,0,1,0,16Zm40-8a8,8,0,0,1,8-8h24a8,8,0,0,1,0,16H152A8,8,0,0,1,144,104Zm84.37,87.47a19.84,19.84,0,0,1-12.9,8.23A20.09,20.09,0,0,1,198,194.31L167.8,160H172a60,60,0,0,0,51-28.38l8.74,45A19.82,19.82,0,0,1,228.37,191.47Z"></path></svg>
                        </div>
                        <p className='text-white tracking-wider text-xl mt-2'>Category</p>
                    </div>
                    <div className='flex items-center ml-12 '>
                        <p className='text-primary text-4xl font-medium'>{countCategory}</p>
                    </div>
                </Link>
                <div className='bg-gray-800 p-6 flex w-min mx-auto'>
                    <div>
                        <div className='text-4xl text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor " viewBox="0 0 256 256"><path d="M247.44,173.75a.68.68,0,0,0,0-.14L231.05,89.44c0-.06,0-.12,0-.18A60.08,60.08,0,0,0,172,40H83.89a59.88,59.88,0,0,0-59,49.52L8.58,173.61a.68.68,0,0,0,0,.14,36,36,0,0,0,60.9,31.71l.35-.37L109.52,160h37l39.71,45.09c.11.13.23.25.35.37A36.08,36.08,0,0,0,212,216a36,36,0,0,0,35.43-42.25ZM104,112H96v8a8,8,0,0,1-16,0v-8H72a8,8,0,0,1,0-16h8V88a8,8,0,0,1,16,0v8h8a8,8,0,0,1,0,16Zm40-8a8,8,0,0,1,8-8h24a8,8,0,0,1,0,16H152A8,8,0,0,1,144,104Zm84.37,87.47a19.84,19.84,0,0,1-12.9,8.23A20.09,20.09,0,0,1,198,194.31L167.8,160H172a60,60,0,0,0,51-28.38l8.74,45A19.82,19.82,0,0,1,228.37,191.47Z"></path></svg>
                        </div>
                        <p className='text-white tracking-wider text-xl mt-2'>Games</p>
                    </div>
                    <div className='flex items-center ml-12 '>
                        <p className='text-primary text-4xl font-medium'>324</p>
                    </div>
                </div>
                <div className='bg-gray-800 p-6 flex w-min mx-auto'>
                    <div>
                        <div className='text-4xl text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor " viewBox="0 0 256 256"><path d="M247.44,173.75a.68.68,0,0,0,0-.14L231.05,89.44c0-.06,0-.12,0-.18A60.08,60.08,0,0,0,172,40H83.89a59.88,59.88,0,0,0-59,49.52L8.58,173.61a.68.68,0,0,0,0,.14,36,36,0,0,0,60.9,31.71l.35-.37L109.52,160h37l39.71,45.09c.11.13.23.25.35.37A36.08,36.08,0,0,0,212,216a36,36,0,0,0,35.43-42.25ZM104,112H96v8a8,8,0,0,1-16,0v-8H72a8,8,0,0,1,0-16h8V88a8,8,0,0,1,16,0v8h8a8,8,0,0,1,0,16Zm40-8a8,8,0,0,1,8-8h24a8,8,0,0,1,0,16H152A8,8,0,0,1,144,104Zm84.37,87.47a19.84,19.84,0,0,1-12.9,8.23A20.09,20.09,0,0,1,198,194.31L167.8,160H172a60,60,0,0,0,51-28.38l8.74,45A19.82,19.82,0,0,1,228.37,191.47Z"></path></svg>
                        </div>
                        <p className='text-white tracking-wider text-xl mt-2'>Games</p>
                    </div>
                    <div className='flex items-center ml-12 '>
                        <p className='text-primary text-4xl font-medium'>324</p>
                    </div>
                </div>
            </section>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    {/* <DropDown /> */}
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm  border  rounded-lg w-80 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search for items"
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No Transaksi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Harga
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Game
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Waktu
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${index}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                        />
                                        <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">{product.color}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{product.accessories}</td>
                                <td className="px-6 py-4">{product.available}</td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">{product.weight}</td>
                                <td className="flex items-center px-6 py-4">
                                    <a href="#" className="font-medium text-blue-500 hover:underline">
                                        Edit
                                    </a>
                                    <a href="#" className="font-medium text-red-500 hover:underline ms-3">
                                        Remove
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                        Showing <span className="font-semibold text-white">1-10</span> of <span className="font-semibold text-white">1000</span>
                    </span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight border rounded-s-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                Previous
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                1
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                2
                            </a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 border bghover:bg-blue-100 hover:text-blue-700 border-gray-700 bg-gray-700 text-white">
                                3
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                4
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                5
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight border rounded-e-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default Page;
