"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Products from './components/productCard';
import Pagination from './components/pagination';
import Filter from './components/filter';
import Header from './components/header';
import { fetchProducts, fetchCategories } from './api';
import Footer from './components/footer';

/**
 * Home component for displaying products, filters, pagination, and header.
 * 
 * This component fetches products and categories based on search parameters,
 * handles filtering, sorting, and pagination of products, and displays
 * relevant UI components.
 * 
 * @returns {JSX.Element} The rendered Home component.
 */
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
    const loadData = async () => {
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
  }, [category, page, sortBy, sortOrder, search]);

  /**
   * Updates the URL with new search parameters and navigates to the new URL.
   * 
   * @param {Object} newParams - The new parameters to update in the URL.
   */
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

  /**
   * Handles filtering of products based on the selected category.
   * 
   * @param {string} newCategory - The new category to filter products by.
   */
  const handleFilter = (newCategory) => updateUrl({ category: newCategory, page: 1 });

  /**
   * Handles sorting of products based on selected sorting options.
   * 
   * @param {string} newSortBy - The field to sort by.
   * @param {string} newSortOrder - The order of sorting ('asc' or 'desc').
   */
  const handleSort = (newSortBy, newSortOrder) => updateUrl({ sortBy: newSortBy, sortOrder: newSortOrder, page: 1 });

  /**
   * Handles searching for products based on user input.
   * 
   * @param {string} newSearch - The new search query.
   */
  const handleSearch = (newSearch) => updateUrl({ search: newSearch, page: 1 });

  /**
   * Handles page changes for pagination.
   * 
   * @param {number} newPage - The new page number to navigate to.
   */
  const handlePageChange = (newPage) => updateUrl({ page: newPage });

  /**
   * Resets all filters and navigates back to the default home page.
   */
  const handleReset = () => router.push('/');

  if (error) {
    return <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">Error: {error}</div>;
  }

  return (
    <div>
      <Header currentSearch={search} onSearch={handleSearch} />
      <Filter
        categories={categories}
        currentCategory={category}
        currentSortBy={sortBy}
        currentSortOrder={sortOrder}
        onFilter={handleFilter}
        onSort={handleSort}
        onReset={handleReset}
      />
      {loading ? (
        <div className="text-center font-bold text-amber-800 p-8">Loading...</div>
      ) : (
        <>
          <Products products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasMore={products.length === 20}
            onPageChange={handlePageChange}
          />
          <Footer />
        </>
      )}
    </div>
  );
}


