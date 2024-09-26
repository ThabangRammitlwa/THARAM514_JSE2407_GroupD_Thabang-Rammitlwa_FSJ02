"use client"
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'
import Products from './components/productCard'
import Pagination from './components/pagination'
import Filter from './components/filter'
import Header from './components/header'
import { fetchProducts,fetchCategories } from './api'

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);


  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts({ page, search, category, sortBy, sortOrder }),
          fetchCategories()
        ]);
        setProducts(productsData.products);
        setTotalPages(productsData.totalPages);
        setCurrentPage(page);
        setTotalProducts(productsData.totalProducts);
        setCategories(categoriesData);
        setError(null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [category,page,sortBy,sortOrder,search]);

  const updateUrl = (newParams) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });
    router.push(`/?${updatedSearchParams.toString()}`);
  };

  const handleFilter = (newCategory) => updateUrl({ category: newCategory, page: 1 });
  const handleSort = (newSortBy, newSortOrder) => updateUrl({ sortBy: newSortBy, sortOrder: newSortOrder, page: 1 });
  const handleSearch = (newSearch) => updateUrl({ search: newSearch, page: 1 });
  const handlePageChange = (newPage) => updateUrl({ page: newPage });
  const handleReset = () => router.push('/');

  if (error) {
    return <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">Error: {error}</div>;
  }


  return (
    <div>
        <Head>
        <title>Our Family Store | Great Products, Great Prices</title>
        <meta name="description" content="Discover our wide range of products at competitive prices. Shop now for the best deals on electronics, fashion, home goods, and more." />
        <meta name="keywords" content="e-commerce, online shopping, products, deals, electronics, fashion, home goods" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Our E-commerce Store | Great Products, Great Prices" />
        <meta property="og:description" content="Discover our wide range of products at competitive prices. Shop now for the best deals on electronics, fashion, home goods, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://domain.com" />
        <meta property="og:image" content="https://domain.com/og-image.jpg" />
        <link rel="canonical" href="https://domain.com" />
      </Head>

        <Header/>
          <Filter
        categories={categories}
        currentCategory={category}
        currentSortBy={sortBy}
        currentSortOrder={sortOrder}
        currentSearch={search}
        onFilter={handleFilter}
        onSort={handleSort}
        onSearch={handleSearch}
        onReset={handleReset}
      />
      {loading ? (
        <div className="text-center font-bold text-amber-800 p-8">Loading...</div>
      ) : (
          <>
    
      <Products products={ products} />
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      hasMore={products.length === 20}
      onPageChange={handlePageChange}
    />
  </>
)}
</div>
);
}

