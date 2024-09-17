import Products from './components/productCard'
import Pagination from './components/pagination'
import { fetchProducts } from './api'

export default async function Home({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  let products;
  let error;

  try {
    products = await fetchProducts(page);
  } catch (err) {
    error = err.message;
  }
  
  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }


  return (
    <div>
      <header className='py-12'>
        <h1 className='text-3xl font-bold text-gray-900'></h1>
      </header>
      <Products products={ products} />
      <Pagination currentPage = {page} hasMore={products.length ===20}/>
    </div>
  )
}

